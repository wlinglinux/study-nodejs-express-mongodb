var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    moment = require('moment'),
    Post = require('../models/Post'),
    middlewareObj = require('../middlewares'),
    Category = require('../models/Category');

    router.get('/', middlewareObj.isLoggedIn, function(req, res){
      //res.render('./blog/test')
      Post.find(function(err, posts){
        if(err){
          console.log("xxxxxxxxxxxxxxxxxxxxxxxxx");
          req.flash('err', err.message);
          return res.redirect('/blog');
        }
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        // var newPost = {
        //   title:'req.body.title',
        //   image:'req.body.image',
        //   content:'req.body.content',
        //   category:'req.body.category',
        //   //create_at:moment().format('MMMM Do YYYY, h:mm:ss a'),
        // };
        // console.log(newPost);
        res.render('./blog/posts', {posts:posts});
      });
    });
    router.get('/post/new', middlewareObj.isLoggedIn, function(req, res){
      console.log("req------------------------------------------");
      Category.find(function(err, categories){
        if(err){
          req.flash('err', err.message);
          return res.redirect('/blog');
        }
        res.render('./blog/new', {categories:categories});
      });

    });

    router.post('/post/new', middlewareObj.isLoggedIn, function(req, res){
      var newPost = {
        title:req.body.title,
        image:req.body.image,
        content:req.body.content,
        category:req.body.category,
        //create_at:moment().format('MMMM Do YYYY, h:mm:ss a'),
      };
      Post.create(newPost, function(err, post){
        if(err){
          console.log(err.message);
          req.flash('err', err.message);
          return res.redirect('/blog/post/new');
        }
        req.flash('success', 'Post created successfuly!');
        res.redirect('/blog/post/' + post.id);
      })
    });

    router.get('/post/:id', middlewareObj.isLoggedIn, function(req, res){
      Post.findById(req.params.id, function(err, post){
        if(err){
          req.flash('err', err.message);
          return res.redirect('/blog');
        }
        res.render('./blog/show', {post:post});
      });
    });

    router.get('/edit/:id', middlewareObj.isLoggedIn, function(req, res){
      Post.findById(req.params.id, function(err, post){
        if(err){
          req.flash('error', err.message);
          return res.redirect('/blog');
        }
        res.render('./blog/edit', {post:post});
      });
    });
    router.delete('/delete/:id', middlewareObj.isLoggedIn, function(req, res){
      Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
          req.flash("error", err.message);
          return res.redirect('/');
        }
      })
      res.redirect('/');
    });

    module.exports = router;
