const mongoose=require("mongoose");
const DB=process.env.DB;
require("dotenv").config();

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true,
}).then((res)=>{
    console.log("Successfully connected");
}).catch((err)=>{
    console.log("Not connected");
})
