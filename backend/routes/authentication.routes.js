'use strict';
var authenticationController = require(global.appRoot + "/backend/controllers/authentication.controller.js");

module.exports = function (router, passport, checkAuthentication) {
    router.post("/api/login", passport.authenticate('local'), authenticationController.login);

    router.get("/api/logout", authenticationController.logout);

    router.post("/api/register", authenticationController.register);

    router.get("/api/getAccountType", checkAuthentication, authenticationController.getAccountType);
};

