var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    moment = require('moment'),
    Category = require('../models/Category'),
    middlewareObj = require('../middlewares');


    router.get('/', middlewareObj.isLoggedIn, function(req, res){
      Category.find(function(err, categories){
        if(err){
          req.flash('error', err.message);
          return res.redirect('/');
        }
        res.render('./category/categories', {categories: categories});
      });
    });

    router.get('/new', middlewareObj.isLoggedIn, function(req, res){
      res.render('./category/new');
    });

    router.post('/new', middlewareObj.isLoggedIn, function(req, res){
      var newCategory = {
        name:req.body.name
      }
      Category.create(newCategory, function(err){
        if(err){
          req.flash('error', err.message);
          return res.redirect('/category/new');
        }
        res.redirect('/category/new');
      });
    });

    router.get('/:id/edit', middlewareObj.isLoggedIn, function(req, res){
      Category.findById(req.params.id, function(err, category){
        if(err){
          req.flash('error', err.message);
          return res.redirect('/category/' + req.params.id);
        }
        res.render('./category/edit', {category:category});
      });
    });
    router.put('/:id/edit', middlewareObj.isLoggedIn, function(req, res){
      console.log(req.params.id + "req.params.name-----------" + req.body.name);
      Category.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name }}, function(err, category){
        if(err){
          req.flash('error', err.message);
          return res.redirect('/category' + req.params.id);
        }
        console.log("category.name-----------" + category.name);
        res.redirect('/category');
      });
    });
    router.delete('/:id', middlewareObj.isLoggedIn, function(req, res){
      Category.findByIdAndRemove(req.params.id, function(err){
        if(err){
          req.flash('error', err.message);
          return res.redirect('/category');
        }
        res.redirect('/category');
      });
    });
  module.exports = router;
