const User = require("../models/User");
const bcrypt =require("bcryptjs");
const jwt = require('jsonwebtoken');


const registerUser = async (req,res) =>{

    try{ 
        const {name ,email, password} =req.body;
        

        if(!name || !email || !password){
            return res.status(400).json({
                message: "All fields are required",
            })
        }


        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message: "User already exists",
            })
        }

        const HashedPassword = await bcrypt.hash(password,10);


        const user = await User.create({
            name,
            email,
            password: HashedPassword,
        });
        
        res.status(201).json({
            message: "user registered successfully",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};



const loginUser = async (req,res) =>{
    try{
        const {email, password} = req.body;
    
        if(!email || !password){
            return res.status(400).json({
                message: "email and password are required",
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        
        const isPasswordCorrect = await bcrypt.compare(
            password, user.password);

            if(!isPasswordCorrect){
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }

const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
      );

      res.cookie("token", token,{
        httpOnly: true,
        secure:process.env.Node_ENV === "production",
        sameSite: "strict",
        maxAge: 24*60*60*1000
      });

            res.status(200).json({
                message: "Login successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });

    } catch (error){
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            user,
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

const logoutUser = (req,res) =>{
    res.clearCookie("token");

    res.status(200).json({
        message: "Logout successfully",
    });
};

module.exports = {registerUser,loginUser,getProfile,logoutUser};
