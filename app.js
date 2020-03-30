var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var commentRouter = require('./routes/comment');
<<<<<<< HEAD
var login = require("./routes/login")
=======
var passportRouter =require('./routes/passports')

>>>>>>> 3d352b390d5eee9152c76a57f89c9287839e228c
var app = express();
require('./config/passport')(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
<<<<<<< HEAD
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'abc',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(passport.initialize());
app.use(passport.session());
=======
app.use(express.static(path.join(__dirname, 'public')));
// passport-facebook
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
app.use(passport.initialize())
passport.use(new FacebookStrategy({
    clientID: 2679285842308625,
    clientSecret: '99491ec02f5becbcf006eca0c14865c3',
    callbackURL: "https://00bc5989.ngrok.io/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   
      done(null, profile);

  }
));
passport.serializeUser(function(user,done){
    console.log("serializeUser", user); 
    done(null,user)
});
passport.deserializeUser(function(user,done){
    
    console.log("deserializeUser",user);
    done(null,user)
});
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/passport' }));


// passport
var passport= require("passport");
var session = require("express-session");
var LocalStratagy = require("passport-local").Strategy;
var UserModel = require("./model/UserModels")
app.use(session({
  secret:"demo",
  resave:false,
  saveUninitialized:true,
  cookie:{maxAge:60000
}}))
app.use(passport.initialize());
app.use(passport.session());
app.route("/")
.get(function(req,res,next){
  res.render("passportFB");
})
//neeus ma sai thì muốn redirect đến trang nào thì dùng option
app.get("/passport",function(req,res,next){
  res.render("passport");
})
app.post("/passport",function(req,res,next){
  passport.authenticate('local',{failureRedirect:"/passport",successRedirect:"/private"})(req,res);
})
//goi class stratagy
app.get("/private",function(req,res,next){
  if(req.isAuthenticated()){
    return res.send("ban da login")
  }else{
    return res.send("ban chua login")
  }
})
app.get("/logout",function(req,res,next){
  req.logOut();
  res.redirect("/passport")
})
passport.use(new LocalStratagy(
  function(email,password,done){
    return UserModel.findOne({email,password}).then(function(user){
      if(!user){
        return done(null,false);
      }
     return done(null,user) 
    })
  }
));
passport.serializeUser(function(user,done){
  console.log("step 1"); 
  done(null,user)
})
passport.deserializeUser(function(user,done){
  console.log(user);
  console.log("step 2");

  return UserModel.findOne({email:user.email}).lean().then(function(user){
    if(!user){
    return  done(null,false);
    }
    return done(null,user)
  })
})
app.get("/session",function(req,res,next){
  if(!req.session.count){
    req.session.count= 0;
  }
  req.session.count++;
  res.json(req.session.count);
});
>>>>>>> 3d352b390d5eee9152c76a57f89c9287839e228c

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/api', commentRouter);
<<<<<<< HEAD

app.use("/login", login)
=======
app.use('/passport',passportRouter)
>>>>>>> 3d352b390d5eee9152c76a57f89c9287839e228c

app.get('/index', function(req, res) {
    res.render('index');
})
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404)); 
// });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;