'use strict';
var express = require('express');
var mongoose = require('mongoose');
var unicornRoutes = require('./routePaths/routePath');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/unicornsapp_development');

var app = express();
app.use(express.static(__dirname + '/build'));
var router = express.Router();

unicornRoutes(router);

app.use('/api/v1', router);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});