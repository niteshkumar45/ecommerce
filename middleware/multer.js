const multer = require('multer')

const storage = multer.diskStorage({
    destination:function (req, file, cb) {  
        cb(null, "uploads")
    },
    filename:(req,file,cb)=>{
        cb(null, `file-${Math.random()}-${file.originalname.split(' ').join('')}`)
    }
})
const upload = multer({storage}).single('productimage');

module.exports = upload