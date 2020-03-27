const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

var multerStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.join(__dirname, '../public/upLoad'))
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});
// For Single File upload
var multerSigleUpload = multer({ storage: multerStorage }).single("singleImage");

// For Multiple File upload
var multerMultipleUpload = multer({ storage: multerStorage }).array("multipleImage", 3);

const upload = multer({
    storage: multerStorage,
    // limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('singleImage');

const uploadMul = multer({
    storage: multerStorage,
    // limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).array("multipleImage", 3);

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Chỉ up đc ảnh ( đuôi JPG,JPEG,PNG,GIF!');
    }
}

// Base index route
router.get('/', function(req, res) {
    res.render('file_upload');

});


router.post("/singleFile", function(req, res) {
    upload(req, res, (err) => {
        if (err) {
            res.json({
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.json({
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.json({
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    });
});
//route for multiple file upload
router.post("/multipleFile", function(req, res) {
    uploadMul(req, res, (err) => {
        if (err) {
            res.json({
                msg: err
            });
        } else {

            res.json({
                msg: 'File Uploaded!',
            });

        }
    });;
});


module.exports = router