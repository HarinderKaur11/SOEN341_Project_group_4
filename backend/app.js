var path = require('path');
global.appRoot = path.resolve(__dirname);

global.models = {};
global.models.userModel = require(global.appRoot + "/models/user.model.js");

var config  = require(appRoot + '/config/server_config');
var express = require(appRoot + '/config/express');
var app     = express();

app.listen(config.port);