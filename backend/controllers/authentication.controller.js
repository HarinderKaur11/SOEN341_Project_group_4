var bcrypt = require('bcrypt');
var saltR  = 10;

exports.login = function(req, res, next) {
    var response = {
        success: "Successfully logged in."
    };
    res.json(response);
};

exports.logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
};

exports.register = function(req, res, next) {
    var response = {};

    if (req.body.username && req.body.password) {
        models.userModel.findOne({ username: req.body.username }, function(err, user) {
            if (err) {
                response.error = "Invalid request.";
                res.status(400).json(response);
            } else {
                if (user) {
                    response.error = "Username already taken.";
                    res.status(400).json(response);
                } else {
                    var user = new models.userModel({
                        username: req.body.username, 
                        password: bcrypt.hashSync(req.body.password, saltR),
                        type: 'student'
                    });

                    user.save(function(err, user) {
                        if (!err) {
                            req.login(user, function(err) {
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
