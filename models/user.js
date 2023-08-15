const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true 
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:[true,"this email is already exists"]
    },
    password:{
        type:String,
        required:true,
    },
    likes:{
        type:mongoose.Schema.Types.ObjectId
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        unique:true
    }]
})

module.exports = new mongoose.model("User",userschema)