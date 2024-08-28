const express= require("express");
const bodyParser=require("body-parser");
const connectDB=require('./config/db');
const notesRoutes=require('./routes/notes')

const app=express();
const PORT=3000;

connectDB();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/notes',notesRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
})