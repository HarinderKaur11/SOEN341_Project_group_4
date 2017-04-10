var adminController = require(appRoot + "/backend/controllers/admin.controller.js");

module.exports = function(router, checkAuthentication) {
    router.post('/admin/setUserType', checkAuthentication, adminController.setUserType);
};
