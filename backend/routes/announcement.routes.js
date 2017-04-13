var announcementController = require(appRoot + "/backend/controllers/announcement.controller.js");

module.exports = function(router, checkAuthentication) {
    router.get("/api/course/:courseId/getAnnouncements", checkAuthentication, announcementController.getAnnouncements);

    router.post("/api/course/:courseId/addAnnouncement", checkAuthentication, announcementController.addAnnouncement);

    router.delete("/api/course/:courseId/deleteAnnouncement/:announcementId", checkAuthentication, announcementController.deleteAnnouncement);
};

