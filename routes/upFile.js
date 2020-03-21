const express = require('express');
// const ejs = require('ejs');
// const bodyParser = require('body-parser');
const multer = require('multer');
const router = express.Router();
const path = require('path');

//set views file
// app.set('views', path.join(__dirname, 'views'));
// //set view engine
// app.set('view engine', 'ejs');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// For Multer Storage
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
    // const uploadStatus = req.app.locals.uploadStatus;
    // req.app.locals.uploadStatus = null;
    res.render('file_upload', {
        // title: 'Up Load file ảnh',
        // uploadStatus: uploadStatus
    });

});


router.post("/singleFile", function(req, res) {
    upload(req, res, (err) => {
        if (err) {
            res.json('Error: Chỉ up đc ảnh ( đuôi JPG,JPEG,PNG,GIF!)');
        } else {
            res.json('Up thành công');
        }
    });
});
//route for multiple file upload
router.post("/multipleFile", function(req, res) {
    uploadMul(req, res, (err) => {
        if (err) {
            res.json('Error: Chỉ up đc ảnh ( đuôi JPG,JPEG,PNG,GIF!)');
        } else {
            res.json('Up thành công');
        }
    });;
});
// Base index route
// router.get('/upFile', function(req, res) {
//     const uploadStatus = req.app.locals.uploadStatus;
//     req.app.locals.uploadStatus = null;
//     res.render('file_upload', {
//         title: 'Up Load file ảnh',
//         uploadStatus: uploadStatus
//     });
// });
//route for single file upload
// router.post("/singleFile", multerSigleUpload.single('singleImage'), function(req, res) {
//     const file = req.file
//     console.log(file);
//     if (!file) {
//         return res.end("Please choose file to upload!");
//     }
//     req.app.locals.uploadStatus = true;
//     res.redirect('/');
// });
//route for multiple file upload
// router.post("/multipleFile", function(req, res) {
//     multerMultipleUpload(req, res, function(err) {
//         if (err) {
//             return res.end("Files uploading unsucessfully!");
//         }
//         req.app.locals.uploadStatus = true;
//         res.redirect('/');
//     });
// });


module.exports = router