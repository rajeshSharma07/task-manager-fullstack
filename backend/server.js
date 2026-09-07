const cors = require("cors");
const express= require('express');
const dotenv =require('dotenv');
const connectDB =require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes =require('./routes/taskRoutes')
const cookieParser = require("cookie-parser");


dotenv.config();
// console.log("JWT SECRET LOADED:", process.env.JWT_SECRET ? "YES" : "NO");
const app= express();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("server is running");
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});