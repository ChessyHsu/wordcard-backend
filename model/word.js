var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Word = new Schema({
  word: String,
  def: String,
});

module.exports = mongoose.model('Word', Word);