var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title:{type:String, require:true},
  image:{type:String, require:true},
  content:{type:String, require:true},
  category:{type:String, require:true},
  //create_at:{type:Date, default:Date.now},
});

module.exports = mongoose.model('Post', postSchema);
