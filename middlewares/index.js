var middlewareObj = {
  localVariables: function(req, res, next){
    // for(let key in req){
    //   console.log("key" + key);
    // }
    // console.log('middlewareObj'+req.user + "req : " + req);
    res.locals.user = req.user;
    // if(res.locals.user)
    //   console.log('--------middlewareObj-------'+res.locals.user.name);
    next();
  },
  isLoggedIn:function(req, res, next){
    if(req.isAuthenticated()){
      next();
    }else{
      req.flash('error', 'You dont\'t have permission to do that!');
      res.redirect('/');
    }
  }
}
module.exports = middlewareObj;
