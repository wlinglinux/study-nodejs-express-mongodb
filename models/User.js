var mongoose = require('mongoose');
  passportLocalMongoose = require('passport-local-mongoose');
  mongoose.Promise = require('bluebird');

  var userSchema = new mongoose.Schema({
    username:{type:String, index:{unique:true}, lowercase:true, require:true},
    name:{type:String},
    email:{type:String, index:{unique:true}, lowercase:true, require:true},
  });
  userSchema.plugin(passportLocalMongoose);
  module.exports = mongoose.model('User', userSchema);
