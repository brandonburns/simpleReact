'use strict';

var mongoose = require('mongoose');

var unicornSchema = new mongoose.Schema({
  unicornBody: String,
  author: {type: String, default: 'Brandon Burns'}
});

module.exports = mongoose.model('Unicorn', unicornSchema);