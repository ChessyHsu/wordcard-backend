var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Wordbook = new Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model('Wordbook', Wordbook);