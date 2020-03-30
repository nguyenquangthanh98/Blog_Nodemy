var express = require('express');
var router = express.Router();



// /* GET home page. */
router.get('/home', function(req, res, next) {
     res.render('index');
 });
 router.get('/about', (req, res) => {
    console.log('Request for about page recieved');
    res.render('about');
  });
  router.get('/new', (req, res) => {
    console.log('Request for about page recieved');
    res.render('new');
  });
  router.get('/contact', (req, res) => {
    console.log('Request for about page recieved');
    res.render('contact');
  });
  router.get('/single', (req, res) => {
    console.log('Request for about page recieved');
    res.render('single');
  });
  router.get('/menu', (req, res) => {
    console.log('Request for about page recieved');
    res.render('MenuAd');
  });
  router.get('/quanlybaiviet', (req, res) => {
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