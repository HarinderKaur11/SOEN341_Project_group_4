var express    = require('express');
var session    = require('express-session');
var bodyParser = require('body-parser');

var serverLogging = function(req, res, next){
	console.log(req.method, req.url);
	next();
};

module.exports = function(){
	var app    = express();
	var router = express.Router();

	var sess   = {
		name: "ohIkgFh3KKxSS57",
		secret: "soen341",
		cookie: {
			secure: false,
			maxAge: 24 * 60 * 60 * 1000
		},
		resave: true,
    	saveUninitialized: false
	};

	app.use(session(sess));

	// Initializing some middleware
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(serverLogging);
	app.use(express.static(appRoot + '/frontend'));

	// API routing rules will be included here
	require(appRoot + '/backend/routes/authentication.routes.js')(router);

	app.use(router);

	return app;
};