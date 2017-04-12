exports.createCourse = function(req, res, next) {
    var response = {};

    if (req.body.name && req.body.shortName && req.user.type == "teacher") {
        var newCourse = new models.courseModel({
            teacher: req.user._id,
            name: req.body.name, 
            shortName: req.body.shortName,
            students: []
        });

        newCourse.save(function(err, course) {
            if (err) {
                response.error = "Could not create the course.";
                res.status(400).json(response);
            } else {
                models.courseModel.findOne({ _id: course._id }).populate("teacher").exec(function(err, course) {
                    if (err) {
                        response.error = "Could not fetch information.";
                        res.status(400).json(response);
                    } else {
                        models.userModel.findOne({ username: req.user.username })
                                .populate({
                                    path: "courses",
                                    populate: {
                                        path: "teacher",
                                        model: "user"
                                    }
                                })
                                .exec(function(err, user) {
                            if (err) {
                                response.error = "Could not fetch information.";
                                res.status(400).json(response);
                            } else if (user) {
                                user.courses.push(course);
                                user.save(function(err) {
                                    if (err) {
                                        response.error = "Could not update information.";
                                        res.status(400).json(response);
                                    } else {
                                        response.courses = user.courses;
                                        response.success = "Successfully created the course.";
                                        res.json(response);
                                    }
                                })
                            } else {
                                response.error = "Currently signed in user does not exist.";
                                res.status(400).json(response);
                            }
                        });
                    }
                });
            }
        });
    } else {
        response.error = "Invalid request.";
        res.status(400).json(response);
    }
};

exports.deleteCourse = function(req, res, next) {
    var response = {};

    if (req.body.courseId && req.user.type === "teacher") {
        // Find the course we want to delete
        models.courseModel.findOne({ _id: req.body.courseId }).populate("teacher").populate("students").exec(function(err, course) {
            if (err) {
                response.error = "Could not fetch information.";
                res.status(400).json(response);
            } else if (course) {
                if (course.teacher._id == req.user._id) {
                    // Remove the course from all the students
                    for (var studentIndex = 0; studentIndex < course.students.length; studentIndex++) {
                        var currStudent = course.students[studentIndex];

                        currStudent.courses.splice(currStudent.courses.indexOf(course._id), 1);
                        currStudent.save();
                    }

                    course.teacher.courses.splice(course.teacher.courses.indexOf(course._id), 1);
                    course.teacher.save();
                    models.courseModel.remove({ _id: req.body.courseId }, function(err) {
                        if (err) {
                            response.error = "Could not delete course.";
                            res.status(400).json(response);
                        } else {
                            response.courses = course.teacher.courses;
                            response.success = "Successfully deleted the course.";
                            res.json(response);
                        }
                    });
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

    if (req.body.courseId && req.user.type === "student") {
        models.courseModel.findOne({ _id: req.body.courseId }).populate("teacher").exec(function(err, course) {
            if (err) {
                response.error = "Could not fetch information.";
                res.status(400).json(response);
            } else if (course) {
                course.students.push(req.user);
                course.save(function(err) {
                    if (err) {
                        response.error = "Could not add student to course.";
                        res.status(400).json(response);
                    } else {
                        models.userModel.findOne({ username: req.user.username })
                                .populate({
                                    path: "courses",
                                    populate: {
                                        path: "teacher",
                                        model: "user"
                                    }
                                }).exec(function(err, user) {
                            if (err) {
                                response.error = "Could not fetch information.";
                                res.status(400).json(response);
                            } else if (user) {
                                user.courses.push(course);
                                user.save(function(err) {
                                    if (err) {
                                        response.error = "Could not update information.";
                                        res.status(400).json(response);
                                    } else {
                                        response.courses = user.courses;
                                        response.success = "Successfully joined the course.";
                                        res.json(response);
                                    }
                                });
                            } else {
                                response.error = "Currently signed in user does not exist.";
                                res.status(400).json(response);
                            }
                        });
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
        models.userModel.findOne({ username: req.user.username }).populate("courses").exec(function(err, user) {
            if (err) {
                response.error = "Could not fetch information.";
                res.status(400).json(response);
            } else if (user) {
                var newCourses = [];
                for (var courseIndex = 0; courseIndex < user.courses.length; courseIndex++) {
                    var currCourse = user.courses[courseIndex];

                    if (currCourse._id != req.body.courseId) {
                        newCourses.push(currCourse);
                    } else {
                        currCourse.students.splice(currCourse.students.indexOf(req.user._id), 1);
                        currCourse.save();
                    }
                }

                user.courses = newCourses;
                user.save(function(err) {
                    console.log(err);
                    if (err) {
                        response.error = "Could not update information.";
                        res.status(400).json(response);
                    } else {
                        response.courses = user.courses;
                        response.success = "Successfully left the course.";
                        res.json(response);
                    }
                });
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

    models.courseModel.find({}).populate("teacher").exec(function(err, courses) {
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
                                path: "courses",
                                populate: {
                                    path: "teacher",
                                    model: "user"
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