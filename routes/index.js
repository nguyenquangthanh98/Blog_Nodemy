var express = require('express');
var router = express.Router();

// /* GET home page. */
router.get('/', function(req, res, next) {
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
module.exports = router;