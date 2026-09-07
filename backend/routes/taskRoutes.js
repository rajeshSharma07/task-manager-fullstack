const express =require("express");

const {createTask, getTasks, getTaskById, updateTask, deleteTask} =require('../controllers/taskController');

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/posttask', authMiddleware, createTask);
router.get('/gettask', authMiddleware, getTasks);
router.get('/gettask/:id', authMiddleware, getTaskById);
router.put('/updatetask/:id', authMiddleware, updateTask);
router.delete('/deletetask/:id', authMiddleware, deleteTask);

module.exports = router;