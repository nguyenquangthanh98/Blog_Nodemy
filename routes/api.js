var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var db = require('../model/userDB');
var sendMail = require('./sendMail')
var saltRounds = 10;
var userMidleware = require('../middleware/userMidleware');



// dang ki





router.post("/sign-up", function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    db.userModel.findOne({
            'local.email': email
        })
        .then(function(checkEmail) {
            if (checkEmail) {
                return res.json('da ton tai')
            } else {
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
                        let html = `link xac nhan <a href="${req.protocol}://${req.get('host')}/api/authEmail/${token}">here</a>`
                        sendMail(to, subject, html)
                        return res.json(
                            'Thành công '
                        );
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
        db.userModel.findByIdAndUpdate({
                _id: decoded.id
            }, { $set: { activeMail: true } })
            .then(function(data) {
                if (data) {
                    // res.json('active thành công')
                    res.redirect('/api/login')
                } else {
                    res.json('lỗi')
                }
            })

    } catch (error) {
        res.json(error)
    }
})

// api Đăng nhập Local không dùng passport

router.post('/sign-in', function(req, res, next) {
        let email = req.body.email
        let password = req.body.password
        db.userModel.find({ 'local.email': email })
            .then((data) => {
                // console.log(data);
                if (data.length == 0) {
                    return res.json('Tài khoản không tồn tại')
                }
                bcrypt.compare(password, data[0].local.password, function(err, value) {
                    if (err) {
                        return res.json(err)

                    } else if (value) {
                        let token = jwt.sign({ _id: data[0].id, email: data[0].local.email }, 'caothaito', { expiresIn: '1h' })
                        return res.json(token)
                    } else {
                        return res.json({
                            error: true,
                            messager: "Sai mật khẩu"
                        })
                    }
                })
            })
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
module.exports = router;