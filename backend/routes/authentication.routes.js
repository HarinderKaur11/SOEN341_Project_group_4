var authenticationController = require(appRoot + "/controllers/authentication.controller.js");

module.exports = function(router) {
    router.post("/login", authenticationController.login);
    
    router.post("/logout", authenticationController.logout);    
};

