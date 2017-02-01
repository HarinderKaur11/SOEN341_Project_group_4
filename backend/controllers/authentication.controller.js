//Future Release - Include error message for incorrect Login

//Function finds the user
exports.login = function(req, res, next){
    models.userModel.findOne({username: req.params.username), function(err, user) {
    	var userObj = {};
    	userObj.username = user.username;
    	res.json(userObj);    
    });
};

exports.logout = function(req, res, next){
    
};
