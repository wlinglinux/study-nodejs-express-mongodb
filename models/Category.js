var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  name:{type:String, index:{unique:true}, lowercase:true, require:true},
});

module.exports = mongoose.model('Category', categorySchema);
