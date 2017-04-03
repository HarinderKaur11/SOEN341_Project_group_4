var path = require('path');
global.appRoot = path.resolve(__dirname);

var config  = require(appRoot + '/config/server_config');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:' + (process.env.DB_PORT || config.db_port) + '/elearning-website');
mongoose.connection.on('error', function() {
    console.log('Failed to connect DB, make sure it is running.');
});

global.database         = mongoose.connection;
global.models           = {};
global.models.userModel = require(global.appRoot + '/backend/models/user.model.js');

var express = require(appRoot + '/config/express');
var app     = express();

var server = app.listen(process.env.PORT || config.port, function() {
    var port = process.env.PORT || config.port;
    console.log('Listening on port: ' + port);
});

module.exports = server;