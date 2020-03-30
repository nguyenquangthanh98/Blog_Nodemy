var express = require('express');
var router = express.Router();
var path = require('path');
var userMiddleware = require('../middleware/userMidleware');
/* GET home page. */
// router.get('/signup', function(req, res, next) {
//     res.render('signup');
// });

router.get('/admin', userMiddleware.checkAdmin, function(req, res, next) {
    // res.redirect(path.join(__dirname, '../views/admin.html'))
    res.json('admin')
})
module.exports = router;