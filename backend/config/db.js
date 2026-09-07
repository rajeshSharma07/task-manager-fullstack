const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connected successfully");
    }catch(error){
        console.log("MongoDB connection failed",err.message);
        process.exit(1);
    }
}

module.exports = connectDB;