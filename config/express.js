var express      = require('express');
var bodyParser   = require('body-parser');
var passportConf = require(appRoot + '/config/passport');

var serverLogging = function(req, res, next){
	console.log(req.method, req.url);
	next();
};

var authenticatedRedirect = function(req, res, next) {
	if (req.isAuthenticated() && req.url === '/') {
		res.redirect('/authenticated/');
		res.end();
	} else {
		next();
	}
}

var checkAuthentication = function(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/non-authenticated');
		res.end();
	}
}

module.exports = function(){
	var app    = express();
	var router = express.Router();

	// Initializing some middleware

	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(serverLogging);
	var passport = passportConf(app);
	app.use(authenticatedRedirect);
	app.use(express.static(appRoot + '/frontend/non-authenticated'));

	// Routing rules will be included here
	require(appRoot + '/backend/routes/authentication.routes.js')(router, passport);

	router.get('/authenticated*', checkAuthentication, function(req, res) {
	    res.sendFile(appRoot + '/frontend' + req.url);
	});

	// Chat API
	var SECRET= "58c4185b-ef62-4968-aea4-9748578cb35e";
	var jwt= require("jsonwebtoken");
	app.post("/tokens", function(req, res) {
	    res.end(jwt.sign({ device: req.body.device }, SECRET, { expiresIn: 86400 }));
	});

	var httpServer= require("http").createServer(app);
	httpServer.listen(3001, function() { console.log("START TOKEN GENERATOR"); });

	app.use(router);

	return app;
};

