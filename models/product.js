const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    productname:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    },
    productdescription:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    }
})

module.exports = new mongoose.model("Product",productschema)