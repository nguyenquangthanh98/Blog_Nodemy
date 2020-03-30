const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const { userModel } = require('../model/userDB')
var saltRourd


module.exports = function (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    async (email, password, done) => {
      try {
        let user = await userModel.findOne({ "local.email": email }).lean().exec()
        if (!user) done(null, false, { message: 'Incorrect email' })
        else {
          bcrypt.compare(password, user.local.password).then(function (isCorrectPassord) {
            if (isCorrectPassord) {
              done(null, user)
            } else {
              done(null, false, { message: 'Incorrect password' })
            }
          })
        }
      } catch (error) {
        done(error)
      }
    }
  ))

  // passport-facebook
  passport.use(new FacebookStrategy({
    clientID: '2679285842308625',
    clientSecret: '99491ec02f5becbcf006eca0c14865c3',
    callbackURL: "https://577c1195.ngrok.io/login/auth/facebook/callback"
  },
    function (accessToken, refreshToken, profile, done) {
      console.log('okay');
      done(null, profile);
    }
  ));


  passport.serializeUser(function (user, done) {
    console.log('serializeUser', user);
    done(null, user)
  })

  passport.deserializeUser(function (id, done) {
    // console.log('deserializeUser', user);
    done(null, id)
  });
}