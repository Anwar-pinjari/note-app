const mongoose = require("mongoose");
const dotenv= require("dotenv");
dotenv.config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGOURI);
        console.log("MongoDb Connected...")
    }catch(err){
        console.log(`Error has generated:`,err.message);
        process.exit(1)
    }
}

module.exports=connectDB;