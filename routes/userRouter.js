const express=require("express");


const router=express.Router();
const {register,registerValidations,login,loginValidations}=require("../controllers/userController");
router.post("/register",registerValidations,register);
router.post('/login',loginValidations,login);


module.exports=router;