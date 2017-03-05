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
                res.json(response);
            } else {
                if (user) {
                    response.error = "Username already taken.";
                    res.json(response);
                } else {
                    var user = new models.userModel({
                        username: req.body.username, 
                        password: bcrypt.hashSync(req.body.password, saltR),
                        type: 'student'
                    });

                    user.save(function(err, user) {
                        if (!err) {
                            response.success = "Successfully created the user.";
                            res.json(response);
                        } else {
                            response.error = "Invalid request.";
                            res.json(response);
                        }
                    });
                }
            }
        });
    } else {
        response.error = "Invalid request paramters.";
        res.json(response);
    }
}
