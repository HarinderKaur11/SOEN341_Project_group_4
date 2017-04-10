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
		res.redirect('/');
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
	require(appRoot + '/backend/routes/admin.routes.js')(router, checkAuthentication);
	require(appRoot + '/backend/routes/authentication.routes.js')(router, passport);
	require(appRoot + '/backend/routes/courses.routes.js')(router, checkAuthentication);

	router.get('/authenticated*', checkAuthentication, function(req, res) {
	    res.sendFile(appRoot + '/frontend' + req.url);
	});

	app.use(router);

	return app;
};