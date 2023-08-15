const mongoose = require("mongoose")

function connect(){
    mongoose.connect("mongodb://127.0.0.1:27017/ecommerce",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{console.log("mongodb connect")}).catch(()=>{console.log("not connect mongodb")})
}

module.exports = connect