var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var db = require('../model/userDB');
var sendMail = require('./sendMail')
var saltRounds = 10;
// var userModel = require('../config/configDb');




// dang ki

router.get('/signup', function(req, res, next) {
    res.render('signup');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});


router.post("/sign-up", function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    db.userModel.findOne({
            'local.email': email
        })
        .then(function(checkEmail) {           
            if (checkEmail) {
                return res.json('da ton tai')
            }else{
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    
                    db.userModel.create({
                        'local.email': email,
                        'local.password': hash
                    }).then(function(data) {
                     
                        let token = jwt.sign({
                            id: data._id
                        }, 'caothaito', {
                            expiresIn: "1h"
                        })
                        let to = req.body.email
                        
                        
                        let subject = 'THU XAC NHAN'
                        let html = `link xac nhan <a href="${req.protocol}://${req.get('host')}/authEmail/${token}">here</a>`
                        sendMail(to,subject , html)
                        // res.json(`${req.protocol}://${req.get('host')}/api/authEmail/${token}`);
                        res.json({
                            token
                        });
                    })
                })
            }
          
        })
        .catch(function(err) {
            console.log(err);
        })
})

router.get('/authEmail/:token', function(req, res, next) {
    try {
        let token = req.params.token;
        let decoded = jwt.verify(token, 'caothaito')
        db.userModel.findByIdAndUpdate({ _id: decoded.id }, { $set: { activeMail: true } })
            .then(function(data) {
                if (data) {
                    res.json('active thành công')
                } else {
                    res.json('lỗi')
                }
            })

    } catch (error) {
        res.json(error)
    }
})


// cach khac

router.get('/checkUserModel', (req, res, next) => {
    db.userModel.find()
        .populate('idPost')
        .populate('idComment')
        .then((data) => {
            res.json(data)
        })
})


module.exports = router;