var express = require('express');
var router = express.Router();
var userMidleware = require('../middleware/userMidleware');



// /* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/about', userMidleware.checkXacThuc, (req, res) => {
    console.log('Request for about page recieved');
    res.render('about');
});
router.get('/new', userMidleware.checkXacThuc, (req, res) => {
    console.log('Request for about page recieved');
    res.render('new');
});
router.get('/contact', userMidleware.checkXacThuc, (req, res) => {
    console.log('Request for about page recieved');
    res.render('contact');
});
router.get('/single', userMidleware.checkXacThuc, (req, res) => {
    console.log('Request for about page recieved');
    res.render('single');
});
router.get('/admin', userMidleware.checkXacThuc, userMidleware.checkAdmin, (req, res) => {
    console.log('Request for about page recieved');
    res.render('MenuAd');
});
router.get('/admin/quanlybaiviet', (req, res) => {
    console.log('Request for about page recieved');
    res.render('post');
});
router.get('/signup', function(req, res, next) {
    res.render('signup');
});
router.get('/login', function(req, res, next) {
    res.render('login');
});

module.exports = router;