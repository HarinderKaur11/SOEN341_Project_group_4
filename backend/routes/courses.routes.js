var coursesController = require(appRoot + "/backend/controllers/courses.controller.js");

module.exports = function(router, checkAuthentication) {
    router.post('/api/createCourse', coursesController.createCourse);

    router.delete('/api/deleteCourse/:id', coursesController.deleteCourse);

    router.post('/api/joinCourse', coursesController.joinCourse);

    router.post('/api/leaveCourse', coursesController.leaveCourse);

    router.post('/api/getCourses', coursesController.getCourses);
};
