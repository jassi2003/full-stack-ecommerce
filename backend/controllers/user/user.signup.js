// const express=require('express');
// const userModel= require('../models/userModel')
const userModel = require("../../models/userModel"); // Updated path
const bcrypt=require('bcrypt');




async function userSignupController(req,res){
    try{
        
const {name,email,password}=req.body;
 const user= await userModel.findOne({email})

 if(user){
    throw new Error("user already exists,please login...")
 }

console.log("req.body",req.body)

if(!name){
    throw new Error("name is required")
}
if(!email){
    throw new Error("email is required")
}
if(!password){
    throw new Error("password is required")
}

const salt=bcrypt.genSaltSync(10);
const hashPassword= await bcrypt.hashSync(password, salt);
if(!hashPassword){
    throw new Error("something went wrong")
}

const payload={
    ...req.body,
    role:"GENERAL",
    password:hashPassword
}

const userData= new userModel(payload)
const saveUser=await userData.save()
res.status(201).json({
    data:saveUser,
    suceess:true,
    error:false,
    message:"user created successfully!!!"
})


    }
    catch(error){
        res.json({
            message:error.message || error,
            error:true,
            success:false,
        })
    }
}

module.exports= userSignupController