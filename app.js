var path = require('path');
global.appRoot = path.resolve(__dirname);

var config  = require(appRoot + '/config/server_config');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:' + config.db_port + '/elearning-website');

global.models = {};
global.models.userModel = require(global.appRoot + '/backend/models/user.model.js');

var express = require(appRoot + '/config/express');
var app     = express();

app.listen(process.env.PORT || config.port);