require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const User = require('../models/user')
const Product = require('../models/product')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('../routes/user')
const saltround = 5

// Home
const home = async (req,res)=>{
    const products = await Product.find()
    if(req.userverified){
        res.render('home',{links:[{url:"#",name:req.userverified.name},{url:"/mycart",name:"Cart"},{url:"/profile",name:"My Profile"}],products:products})
    }else{
        res.render('home',{links:[{url:"/login",name:"Login"},{url:"/signup",name:"Sign Up"}],products:products})
    }
}

// signup
const signup = (req,res)=>{
    res.render('signup')
}

const signuppost = async (req,res)=>{
    try{
        const check = await User.findOne({email : req.body.email})
        if(!check){
            const hashpas = await bcrypt.hash(req.body.password,saltround)
            const data = {
                name:req.body.name,
                email:req.body.email,
                password:hashpas
            }
            await User.insertMany([data])
            const token = jwt.sign({name:req.body.name,email:req.body.email},process.env.SECRET,{expiresIn:"2d"})
            res.cookie("token",token,{maxAge:86000000})            
            res.send("your account is created") 
        }else{
            res.status(201).send("this email is already used in another account")
        }
    }catch(err){
        console.log(err);
        res.status(500).send("error")
    }
}

// Login
const login = (req,res)=>{
    res.render('login')
}

const loginpost = async (req,res)=>{
    try{
        const check = await User.findOne({email:req.body.email})

        if(!check){
            return res.status(401).send("the user not find")
        }

        const checkpas = await bcrypt.compare(req.body.password,check.password)

        if(checkpas){
            const token = jwt.sign({name:check.name,email:check.email},process.env.SECRET,{expiresIn:"2d"})
            res.cookie("token",token,{maxAge:86000000})            
            res.status(201).send("you have successfully logged in")
        }else{
            res.status(201).send("Invalid Password")
        }
    }catch{
        res.status(500).send("error while you try to login")
    }
}
 
const admin = (req,res) =>{
    res.render('admin')
}

const productupload = async (req,res)=>{
    try{
        const data = {
            productname : req.body.productname,
            price : Number(req.body.price),
            productdescription : req.body.productdescription,
            category : req.body.category,
            imageurl : req.file.filename
        }
        console.log(data);
        const products = await Product.insertMany([data])
        res.status(201).send("uploaded")
    }catch{
        res.status(500).send("product not upload")
    }
}

//cart

const addtocart = async (req,res)=>{
    const user = req.userverified;
    if(!user){
        return res.send("You have to Login Before Adding products in Cart")
    }
    const newid = new mongoose.Types.ObjectId(req.params)

    let check = user.cart.indexOf(newid)
    if(check === -1){
        user.cart.push(newid)
        await user.save()
        res.send("the product is added in your cart")
    }else{
        res.send("this product is already in your cart")
    }
}

const cart = async (req,res)=>{
    const user = req.userverified;
    if(user){
        const items = await user.populate('cart')
        let total = 0;
        items.cart.forEach((product)=>{
            total = total + product.price
        })
        res.render('mycart',{products:items.cart,total})
    }else{
        res.send("you have to login before shopping")
    }
}

const remove = async (req,res)=>{
    try{
            const user = req.userverified;
            if(!user){
                return res.send("Please Login")
            }
            user.cart = user.cart.filter(item=>{
            if(item._id.toString() !== req.params.id){
                return true;
            }
            })
            await user.save()
            res.send("this item is removed successfully from your cart")
    }catch{
        res.status(501).send("Please Try again after some time")
    }
}

const allproducts = async (req,res)=>{
    const getproducts = await Product.find()
    res.render('allproducts',{products:getproducts})
}

const removeitemfromstock = async (req,res)=>{
    try{
        const checkproduct = await Product.findByIdAndDelete(req.params.id)
        if(!checkproduct){
            return res.send("the product is not find")
        }else{
            res.send("the product is deleted")
        }
    }catch{
        res.status(501).send("there is an error while removing item from stock")
    }
}

const updateitem = async (req,res)=>{
    try{
        const fetchproduct = await Product.findById(req.params.id)
        if(!fetchproduct){
            return res.send("internal server error")
        }
        res.render('updateitem',{product:fetchproduct})
    }catch{
        res.status(501).send("please try again after some time")
    }
}

const updateitempost = async (req,res)=>{
    console.log("update item body is ",req.body);
    console.log("image name is ",req.file.filename);
    res.send("wait")
}

module.exports = {updateitempost,updateitem,removeitemfromstock,allproducts,remove,addtocart,signup,signuppost,home,login,loginpost,admin,productupload,cart}