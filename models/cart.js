const mongoose = require("mongoose")

const cartschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    total:{
        type:Number,
        default:0
    }
})