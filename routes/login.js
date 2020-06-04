const router = require('express').Router()
const passport = require('passport')
const jwt = require("jsonwebtoken")
router.post('/', function(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.json({
                error: true,
                message: "sai tài khoản hoặc mật khẩu"
            })
        }
        req.login(user, { session: false }, async(err) => {
            console.log(user);
            let token = jwt.sign({
                id: user._id
            }, 'caothaito', {
                expiresIn: "1d"
            })
            res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 })
            // res.json("Hãy chuyển trang hay làm gì đó ở dòng 20, trong đường dẫn /routers/login.js")
            res.json(token)
                // res.redirect('/home')
        })
    })(req, res)
})

router.get('black_list', (req, res, next) => {

})
module.exports = router