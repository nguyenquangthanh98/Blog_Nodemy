const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const {userModel} = require('../model/userDB')
var saltRourd
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      let user = await userModel.findOne({ "local.email":email }).lean().exec()
      if (!user) done(null, false, { message: 'Incorrect email' })
      else {
        bcrypt.compare(password, user.local.password).then(function(isCorrectPassord) {
          if(isCorrectPassord){
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

module.exports = passport