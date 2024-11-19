const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null,path.join(__dirname,"../public/img"))

    },
    filename: function(req, file, cb){
        cb(null,   `img${Date.now()}.${file.mimetype.split('/')[1]}`)
    }



})

const uploader = multer({storage:storage});

module.exports = uploader;