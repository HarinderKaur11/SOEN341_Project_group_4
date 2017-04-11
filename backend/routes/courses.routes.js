var courseController = require(appRoot + "/backend/controllers/course.controller.js");

module.exports = function(router, checkAuthentication) {
    router.post('/api/createCourse', courseController.createCourse);

    router.delete('/api/deleteCourse/:id', courseController.deleteCourse);

    router.post('/api/joinCourse', courseController.joinCourse);

    router.post('/api/leaveCourse', courseController.leaveCourse);

    router.get('/api/getAllCourses', courseController.getAllCourses);

    router.get('/api/getMyCourses', courseController.getMyCourses);
};
