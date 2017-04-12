var authenticationController = require(appRoot + "/backend/controllers/authentication.controller.js");

module.exports = function(router, passport, checkAuthentication) {
    router.post("/login", passport.authenticate('local'), authenticationController.login);
    
    router.get("/logout", authenticationController.logout);

    router.post("/api/register", authenticationController.register);

    router.get("/api/getAccountType", checkAuthentication, authenticationController.getAccountType);
};

