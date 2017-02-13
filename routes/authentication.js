var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = require('../models/User'),
    passport = require('passport');
    mongoose.Promise = require('bluebird');

router.get('/login', function(req,res){
  res.render('./authentication/login');
});

// router.post('/login', function(req,res){
//   console.log('----------------login---------------------------')
//   passport.authenticate('local', {
//     failureRedirect:'/users/login',
//     failureFlash:req.flash('error'),
//     successRedirect:'/',
//     successFlash:req.flash('success')
//     //failureFlash: true
//   });
// });
router.post('/login',function(req, res){
  passport.authenticate('local',{
    failureRedirect:'/users/login',
    failureFlash:req.flash('error'),
  })(req, res, function(){
    if(req.isAuthenticated()){
      req.flash('success', 'welcome login!');
      console.log("-------login--------------" + req.user + "--------------");
      res.redirect('/');
      // res.render('./index', {user:req.user});// + req.user
    }
  });
});
// router.post('/login', function(req, res, next){
//   console.log('-------------------login------------------------');
//   passport.authenticate('local', function(err, user, info) {
//       if (err) {
//         console.log('-------------------err------------------------');
//         return next(err);
//       }
//       if (!user) {
//         req.flash('errors', { msg: info.message });
//         return res.redirect('/users/login');
//       }
//       console.log('-------------------user------------------------');
//       req.logIn(user, function(err) {
//         if (err) return next(err);
//         req.flash('success', { msg: '登录成功！' });
//         res.redirect('/');
//       });
//     });
//   }
// );

router.get('/signup', function(req,res){
  res.render('./authentication/signup')
});
router.post('/signup', function(req,res){
  console.log('-------------------------------------------');
  var newUser = {
    username:req.body.username,
    name:req.body.name,
    email:req.body.email,
  };
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log('------------------err-------------------------');
      req.flash('err', err.message);
      return res.redirect('/users/signup');
    }
    passport.authenticate('local',{
      failureRedirect:'/users/signup',
      failureFlash:req.flash('error'),
    })(req, res, function(){
      if(req.isAuthenticated()){
        req.flash('success', 'welcome back!');
        res.redirect('/');
      }
    });
  });
});

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
