// kết nối đến cơ sở dữ liệu 
const mongoose = require('mongoose');
require('dotenv').config();// tải các biến môi trường 

const connectDB = async () => {
    console.log("url: ",process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure 0 success \\1 failure
    }
}   

module.exports = { connectDB }; 