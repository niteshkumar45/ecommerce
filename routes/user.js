const express = require('express')
const router = express.Router()
const usercontroller = require('../controller/user')
const Auth = require('../auth/auth')
const multerconfig = require('../middleware/multer')

router.get("/",Auth,usercontroller.home)

router.get("/signup",usercontroller.signup)
router.post("/signup",usercontroller.signuppost)

router.get("/login",usercontroller.login)
router.post("/login",usercontroller.loginpost)

router.get("/admin",usercontroller.admin)
router.post("/productupload",multerconfig,usercontroller.productupload)

router.get("/addtocart/:id",Auth,usercontroller.addtocart)
router.get("/remove/:id",Auth,usercontroller.remove)
router.get("/mycart",Auth,usercontroller.cart)

router.get("/admin/allproducts",usercontroller.allproducts)
router.get("/removeitemfromstock/:id",usercontroller.removeitemfromstock)
router.get("/updateitem/:id",usercontroller.updateitem)
router.post("/updateitem/:id",multerconfig,usercontroller.updateitempost)
module.exports = router