var path = require("path");
var express = require('express');
var app = express();
var appRoot = path.resolve(__dirname);

app.get('/', function(req, res, next) {
    res.sendFile(appRoot + '/index.html');
});

app.use(express.static(appRoot + '/'));

app.listen(3001, function() {
    console.log("Listening on port 3001");
});