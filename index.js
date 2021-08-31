const express = require("express");
const bodyParser=require("body-parser");
// const cookieParser = require('cookie-parser');
require("dotenv").config();
require("./config/db");
const path=require("path");
const app = express();
const router = require("./routes/userRouter");
const postRoutes=require("./routes/postRouter");
const profileRoutes=require("./routes/profileRouter");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
// Middlewares
// app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use("/", router);
app.use("/",postRoutes);
app.use("/",profileRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })

}


app.listen(PORT, () => {
    console.log(`Listening to port no ${PORT}`);
})
