var express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('morgan'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Post = require('./models/Post'),
    User = require('./models/User'),
    middlewareObj = require('./middlewares');
    mongoose.Promise = require('bluebird');
    // var bcrypt = require('bcrypt');
    //
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
    // passport.use(new LocalStrategy({ usernameField: 'username' }, function(username, password, done) {
    //   //实现用户名或邮箱登录
    //   //这里判断提交上的username是否含有@，来决定查询的字段是哪一个
    //   var criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username};
    //   User.findOne(criteria, function(err, user) {
    //     if (!user) return done(null, false, { message: '用户名或邮箱 ' + username + ' 不存在'});
    //     bcompare(password, hash, function(err, isMatch) {
    //       if (isMatch) {
    //         return done(null, user);
    //       } else {
    //         return done(null, false, { message: '密码不匹配' });
    //       }
    //     });
    //   });
    // }));
    // var bcompare = function (str, hash, callback) {
    //   bcrypt.compare(str, hash, callback);
    //   };
    //cd D:\Program Files\MongoDB\Server\3.4\bin
    //mongod.exe --dbpath c:\data\db
    //netstat -aon|findstr "49157"

    //mongod.exe --bind_ip 127.0.0.1 --logpath "c:\data\dbConf\mongodb.log" --logappend --dbpath "c:\data\db" --port 27017 --serviceName "mongondb" --serviceDisplayName "blog" --install

    mongoose.connect('mongodb://localhost:27017/personal_blog', function(){
      console.log('Connectd to the database!!');
      // var post = new Post({
      //   title:'cat',
      //   image:'http://img5.imgtn.bdimg.com/it/u=1777085218,2013955165&fm=23&gp=0.jpg',
      //   content:'i am cat!!!',
      //   category:'Web Develop',
      // });
      // post.save();
      // console.log(post);
      // Post.find(function(err, posts){
      //   if(err){
      //     throw err;
      //   }
      //   console.log(posts);
      // });
    })


    app.set('port', process.env.PORT || 5000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    //app.use(express.favicon());
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride('_method'));
    //app.use(app.router);
    app.use(session({
      secret: 'Hey',
      resave: false,
      saveUninitialized: true
      // cookie: { secure: false }
    }));
    // app.use(function(req, res, next){
    //   res.locals.user = req.user;
    //   next();
    // });
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    passport.serializeUser(User.serializeUser());
    passport.use(new LocalStrategy(User.authenticate()));
    app.use(middlewareObj.localVariables);
    // 设定静态文件目录，比如本地文件
    // 目录为demo/public/images，访问
    // 网址则显示为http://localhost:3000/images
    //app.use(express.static(path.join(__dirname, 'public')));



    var blogRouts = require('./routes/blog');
        authenticateRouts = require('./routes/authentication');
        categoryRoutes = require('./routes/category');


    app.use('/blog', blogRouts);
    app.use('/users', authenticateRouts);
    //app.use(middlewareObj.localVariables);
    app.use('/category', categoryRoutes);


    app.get('/', function(req,res){
      console.log('index.ejs');
      res.render('./index');
    });

    app.listen(app.get('port'), function(){
      console.log('Server is up and running!!');
    })
