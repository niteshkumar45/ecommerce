require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/user')
const dbconnect = require('./config/dbconnect')
const cookieparser = require('cookie-parser')

app.use(cookieparser())
dbconnect()
app.use(express.static("uploads"))
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use("/",routes)

app.listen(process.env.PORT || 3000,()=>{
    console.log("the server is running");
})
