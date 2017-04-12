'use strict';

var bcrypt = require('bcrypt');
var saltR  = 10;

exports.login = function (req, res) {
    var response = {
        success: "Successfully logged in."
    };
    res.json(response);
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.register = function (req, res) {
    var response = {};

    if (req.body.name && req.body.username && req.body.password) {
        global.models.userModel.findOne({ username: req.body.username }, function (err, user) {
            if (err) {
                response.error = "Invalid request.";
                res.status(400).json(response);
            } else {
                if (user) {
                    response.error = "Username already taken.";
                    res.status(400).json(response);
                } else {
                    var user = new global.models.userModel({
                        name: req.body.name,
                        username: req.body.username,
                        password: bcrypt.hashSync(req.body.password, saltR),
                        type: 'student',
                        courses: []
                    });

                    user.save(function (err, user) {
                        if (!err) {
                            req.login(user, function (err) {
                                if (err) {
                                    response.error = "Could not login after creating user.";
                                    res.status(400).json(response);
                                }
                                response.success = "Successfully created the user.";
                                res.json(response);
                            });
                        } else {
                            response.error = "Could not save user, try again.";
                            res.status(400).json(response);
                        }
                    });
                }
            }
        });
    } else {
        response.error = "Invalid request parameters.";
        res.status(400).json(response);
    }
};

exports.getAccountType = function (req, res) {
    var response = {};

    if (req.user) {
        response.type = req.user.type;
        res.json(response);
    } else {
        response.error = "You are not signed in.";
        res.status(400).json(response);
    }
};