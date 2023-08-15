const jwt = require('jsonwebtoken')
const User = require('../models/user')
const express = require('express')
const Product = require('../models/product')

const authuser = async (req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return next()
        }
        const data = jwt.verify(token,process.env.SECRET)
        const checkuser = await User.findOne({email : data.email})
        if(checkuser){
            req.userverified = checkuser;
            next()
        }else{
            next()
        }
    } catch(error){
        res.send("Internal server error")
    }
}

module.exports = authuser