//Future Release - Include error message for incorrect Login

//Function finds the user
exports.login = function(req, res, next) {
    models.userModel.findOne({username: req.body.username}, function(err, user) {
        if (err === null) {
            if (user !== null) {
            	var userObj = {};
            	userObj.username = user.username;
            	res.json(userObj);    
            } else {
                var err = {
                    "error": "Username or password is incorrect"
                };

                res.json(err);
            }
        } else {
            var err = {
                "error": "Failed to login"
            };

            res.json(err);
        }
    });
};

exports.logout = function(req, res, next) {
    
};
