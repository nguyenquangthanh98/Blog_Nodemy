const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
var bcrypt = require('bcrypt')
const saltRounds = 10;
var jwt = require('jsonwebtoken')
var db = require('../model/userDB')


// router.post('/reset', function (req,res,next) {
//     var email= req.body.email
//     var pasword = req.body.pasword
//     var newPassword = req.body.newPassword

//     db.userModel.findOne({'local.email': email}).then(function (value) {
//         if(value) {
//             bcrypt.compare(password, value.local.password, function (err,boolean) {
//                 if (boolean) {
//                     bcrypt.hash(newPassword, saltRounds, function (err,hash) {
//                         if(err) {
//                             return res.json({
//                                 error: true,
//                                 data: err
//                             })
//                         }
//                        db.userModel.updateOne({' local.email': email},{' local.passwod' :hash})
//                     .then(function (value) {
//                         res.json({
//                             error: false,
//                             data: 'change password success'
//                         })
//                     })
//                     .catch((err) => {
//                         return res.json({
//                             error: true,
//                             data: err
//                         })
//                     })
//                     })
//                 } else {
//                     res.json({
//                         error: true,
//                         data: ' Wrong password'
//                     })
//                 }
//             })
//         }
//     })
// })




router.post('/change-password', function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    let newPassword = req.body.newpassword;
    let token = req.cookies.token;
    let dataDecode = jwt.verify(token,"caothaito");
    console.log(dataDecode);
    // db.userModel.findOne({ 'local.email': email })
    //     .then(function (data) {
    //         if (data) {
    //             // console.log(data);
    //             bcrypt.compare(password, data.local.password, function (err, value) {
    //                 if (value) {
    //                     console.log("111111111");
    //                     bcrypt.hash(newPassword, saltRounds, function (err, hash) {
    //                         if (err) {
    //                             return res.json({
    //                                 error: true,
    //                                 data: err
    //                             })
    //                         }
    //                         db.userModel.updateOne({ 'local.email': email }, { 'local.password': hash })
    //                             .then(function (data) {
    //                                 res.json({
    //                                     error: false,
    //                                     data: 'change password success'
    //                                 })
    //                             })
    //                             .catch((err) => {
    //                                 return res.json({
    //                                     error: true,
    //                                     data: err
    //                                 })
    //                             })
    //                     })
    //                 } else {
    //                     res.json({
    //                         error: true,
    //                         data: 'wrong password'
    //                     })
    //                 }
    //             })
    //         }
    //     })
})
module.exports = router;