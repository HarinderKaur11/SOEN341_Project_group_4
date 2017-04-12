var courseController = require(appRoot + "/backend/controllers/course.controller.js");

module.exports = function(router, checkAuthentication) {
    router.post('/api/createCourse', checkAuthentication, courseController.createCourse);

    router.post('/api/deleteCourse', checkAuthentication, courseController.deleteCourse);

    router.post('/api/joinCourse', checkAuthentication, courseController.joinCourse);

    router.post('/api/leaveCourse', checkAuthentication, courseController.leaveCourse);

    router.get('/api/getAllCourses', checkAuthentication, courseController.getAllCourses);

    router.get('/api/getMyCourses', checkAuthentication, courseController.getMyCourses);
};
