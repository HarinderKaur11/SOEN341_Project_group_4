var uuid = require('uuid/v4');

exports.createCourse = function(req, res, next) {
    var response = {};

    if (req.body.name && req.body.shortName && req.user.type == "teacher") {
        var course = new models.courseModel({
            teacher: req.user._id,
            name: req.body.username, 
            shortName: bcrypt.hashSync(req.body.password, saltR),
            students: []
        });

        course.save(function(err, course) {
            if (err) {
                response.error = "Could not create the course.";
                res.status(400).json(response);
            } else {
                response.success = "Successfully created the course.";
                res.json(response);
            }
        });
    } else {
        response.error = "Invalid request.";
        res.status(400).json(response);
    }
};

exports.deleteCourse = function(req, res, next) {
    var response = {};

    if (req.body.courseId && req.user.type == "teacher") {
        course.findOne({ _id: req.body.courseId }).populate('teacher').exec(function(err, course) {
            if (err) {
                response.error = "Could not fetch information.";
                res.status(400).json(response);
            } else if (course) {
                if (course.teacher._id == req.user._id) {
                    models.courseModel.deleteOne({ _id: req.body.courseId });
                    response.success = "Successfully deleted the course.";
                    res.json(response);
                } else {
                    response.error = "You do not own this course.";
                    res.status(400).json(response);
                }
            } else {
                response.error = "Course does not exist.";
                res.status(400).json(response);
            }
        });
    } else {
        response.error = "Invalid request.";
        res.status(400).json(response);
    }
};

exports.joinCourse = function(req, res, next) {
    var response = {};

    if (req.body.courseId && req.user.type == "student") {
        models.courseModel.findOne({ _id: req.body.courseId }, function(err, course) {
            if (err) {
                response.error = "Could not fetch information.";
                res.status(400).json(response);
            } else if (course) {
                models.userModel.findOne({ username: req.user.username }, function(err, user) {
                    if (err) {
                        response.error = "Could not fetch information.";
                        res.status(400).json(response);
                    } else if (user) {
                        var newCourses = courses;
                        newCourses.append(course._id);
                        models.userModel.update({ username: req.user.username }, { courses: newCourses });
                    } else {
                        response.error = "Currently signed in user does not exist.";
                        res.status(400).json(response);
                    }
                });
            } else {
                response.error = "Course does not exist.";
                response.status(400).json(response);
            }
        });
    } else {
        response.error = "Invalid request.";
        res.status(400).json(response);
    }
};

exports.leaveCourse = function(req, res, next) {
    var response = {};

    if (req.body.courseId && req.user.type == "student") {
        models.userModel.findOne({ username: req.user.username }, function(err, user) {
            if (err) {
                response.error = "Could not fetch information.";
                res.status(400).json(response);
            } else if (user) {
                var newCourses = [];
                for (var courseIndex in user.courses) {
                    var currCourse = user.courses[courseIndex];

                    if (currCourse != req.body.courseId) {
                        newCourses.append(currCourse);
                    }
                }

                models.userModel.update({ username: req.user.username }, { courses: newCourses });
            } else {
                response.error = "Currently signed in user does not exist.";
                res.status(400).json(response);
            }
        });
    } else {
        response.error = "Invalid request.";
        res.status(400).json(response);
    }
};

exports.getAllCourses = function(req, res, next) {
    var response = {};

    models.courseModel.find({}).populate('teacher').exec(function(err, courses) {
        if (err) {
            response.error = "Could not fetch information.";
            res.status(400).json(response);
        } else {
            response.courses = courses;
            res.json(response);
        }
    });
};

exports.getMyCourses = function(req, res, next) {
    var response = {};

    models.userModel.findOne({ username: req.user.username })
                    .populate({
                                path: 'courses',
                                populate: {
                                    path: 'teacher',
                                    model: 'user'
                                }
                            })
                    .exec(function(err, user) {
        if (err) {
            response.error = "Could not fetch information.";
            res.status(400).json(response);
        } else if (user) {
            response.courses = user.courses;
            res.json(response);
        } else {
            response.error = "Currently signed in user does not exist.";
            res.status(400).json(response);
        }
    });
};