var uuid = require('uuid/v4');

exports.createCourse = function(req, res, next) {
    var response = {};

    if (req.body.name && req.body.shortName && req.user.type == "teacher") {

    } else {
        response.error = "Invalid request.";
        res.status(400).json(response);
    }
};

exports.deleteCourse = function(req, res, next) {
    var response = {};

    if (req.body.courseId && req.user.type == "teacher") {

    } else {
        response.error = "Invalid request.";
        res.status(400).json(response);
    }
};

exports.joinCourse = function(req, res, next) {
    var response = {};

    if (req.body.courseId && req.user.type == "student") {

    } else {
        response.error = "Invalid request.";
        res.status(400).json(response);
    }
};

exports.leaveCourse = function(req, res, next) {
    var response = {};

    if (req.body.courseId && req.user.type == "student") {

    } else {
        response.error = "Invalid request.";
        res.status(400).json(response);
    }
};

exports.getCourses = function(req, res, next) {
    var response = {};


};