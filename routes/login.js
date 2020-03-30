const router = require('express').Router()
const jwt = require("jsonwebtoken")
const passport = require('passport')


router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/index',
                                      failureRedirect: '/' }));
// passport
router.post('/',function(req,res,next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.json({
           error:true,
           message : "sai tài khoản hoặc mật khẩu"
          })
        }
        req.login(user, { session: false }, async (err) => {
         console.log(user);
         let token = jwt.sign({
            id: user._id
        }, 'caothaito', {
            expiresIn: "1d"
        })
        res.cookie("token",token,{maxAge:24*60*60*1000})
        res.render('index')
        })
      })(req, res)
})

module.exports =  router 