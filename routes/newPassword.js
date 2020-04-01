const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
var bcrypt = require('bcrypt')
const saltRounds = 10;
var jwt = require('jsonwebtoken')
var db = require('../model/userDB')
router.post('/change-password', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    let newPassword = req.body.newpassword;
    db.userModel.findOne({ 'local.email': email })
        .then(function (data) {
            if (data) {
                bcrypt.compare(password, data.local.password, function (err, value) {
                    if (value) {
                        bcrypt.hash(newPassword, saltRounds, function (err, hash) {
                            console.log(hash);
                            if (err) {
                                return res.json({
                                    error: true,
                                    data: err
                                })
                            }
                        
                            db.userModel.updateOne({ 'local.email': email }, { 'local.password': hash })
                                .then(function (data) {
                                    res.json({
                                        error: false,
                                        data: 'change password success'
                                    })
                                })
                                .catch((err) => {
                                    return res.json({
                                        error: true,
                                        data: err
                                    })
                                })
                        })
                    } else {
                        res.json({
                            error: true,
                            data: 'wrong password'
                        })
                    }
                })
            }
        })
})
module.exports = router;