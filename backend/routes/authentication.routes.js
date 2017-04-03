var authenticationController = require(appRoot + "/backend/controllers/authentication.controller.js");

module.exports = function(router, passport) {
    router.post("/login", passport.authenticate('local'), authenticationController.login);
    
    router.get("/logout", authenticationController.logout);

    router.post("/register", authenticationController.register);
};

