var jwt = require('jsonwebtoken');
var dbUser = require('../model/userDB');
var bcrypt = require('bcrypt');


function checkAdmin(req, res, next) {
    let token = req.cookies.token
    try {
        if (token) {
            var jwtDecoded = jwt.verify(token, 'caothaito');
            console.log(jwtDecoded);
            if (jwtDecoded.data.type === 1) {
                next()
            } else {
                res.json('bạn là user')
            }
        } else {
            // res.redirect('/api/login')
            res.json('loix')
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

module.exports = { checkAdmin }