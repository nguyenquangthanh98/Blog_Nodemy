var jwt = require('jsonwebtoken');
var dbUser = require('../model/userDB');
var bcrypt = require('bcrypt');


function checkAdmin(req, res, next) {
    let token = req.cookies.token
    try {
        if (token) {
            var jwtDecoded = jwt.verify(token, 'caothaito');
            console.log(jwtDecoded);
            dbUser.userModel.findById({
                _id: jwtDecoded.id
            }).then((data) => {
                if (data.type === 1) {
                    next()
                } else {
                    res.json({
                        error: true,
                        message: 'Bạn là user, không có quyền vào'
                    })
                }
            })

        } else {
            res.redirect('/login')
                // res.json('loi ko co token')
        }
    } catch (error) {
        console.log(error);
        if (error.message === 'jwt malformed') {
            return res.json({
                status: 401,
                err: "ban nhap sai mat khau hoac tai khoảnnnnnnnnn"
            })
        }
    }
}

function checkXacThuc(req, res, next) {
    let token = req.cookies.token
    try {
        if (token) {
            var jwtDecoded = jwt.verify(token, 'caothaito');
            dbUser.userModel.findById({
                _id: jwtDecoded.id
            }).then((data) => {
                if (data.activeMail === true) {
                    next()
                } else {
                    res.json({
                        error: true,
                        message: 'Bạn chưa xác thực, vui lòng vào mail xác thực'
                    })
                }
            })
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        if (error.message === 'jwt malformed') {
            return res.json({
                status: 401,
                err: "Tài khoản không tồn tại"
            })
        }
    }
}
module.exports = { checkAdmin, checkXacThuc }