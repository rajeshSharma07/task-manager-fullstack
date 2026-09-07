const Task = require("../models/Task");

const createTask = async (req, res) =>{
    try{
        const {title, description} = req.body;

        if(!title){
            return res.status(400).json({
                message: "Title is required",
            });
        }

        const task =await Task.create({
            title,
            description,
            user: req.user.userId,
        });

        res.status(201).json({
            message: "Task created successfylly",
            task,
        });

    }catch (error){
        res.status(500).json({
            messsage: "Server error",
            error: error.message,
        });
    }
};

const getTasks = async (req, res) =>{
    try{
        const tasks = await Task.find({
            user: req.user.userId
        }).sort({createdAt: -1});

        res.status(200).json({tasks,
        });
}catch (error){
    res.status(500).json({
        message: "Server error",
        error: error.message,
    });
}
}

const getTaskById = async (req, res)=>{
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.userId,        
        });

        if(!task){
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({task,

        });

    }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}


const updateTask = async (req, res)=>{
    try{
    const {title, description, status} =req.body;

    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user.userId,
    });

    if(!task){
        return res.status(404).json({
            message: "Task not found",
        });
    }

    if(title !== undefined){
        task.title = title;
    }

    if(description !== undefined){
        task.description = description;
    }

    if(status !== undefined){
        task.status = status;
    }

    await task.save();

    res.status(200).json({
        message: "Task updated successfully",
        task,
    });

    }catch(error){
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};



const deleteTask  = async (req, res) => {
    try{
        const task =  await Task.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if(!task){
            return res.status(404).json({
                message: "Task not found",
            });
        }
            await task.deleteOne();

            res.status(200).json({
                message: "Task deleted successfylly",
            });

        } catch (error){
            res.status(500).json({
                message: "Server error",
                error: error.message,
            });
        }
    }


module.exports = {createTask, getTasks, getTaskById, updateTask, deleteTask};