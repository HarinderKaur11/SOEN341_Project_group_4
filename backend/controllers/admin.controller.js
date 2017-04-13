'use strict';

exports.setUserType = function (req, res) {
    var response = {};

    if (req.user.username && req.body.type && req.body.superSecretKey === "t12hisIs231MyS321uperSe32cretKey1235213") {
        global.models.userModel.findOne({ username: req.user.username }, function (err, user) {
            if (err) {
                response.error = "Mongod DB failed to retrieve user.";
                res.status(400).json(response);
            } else if (user) {
                global.models.userModel.update({ username: req.user.username }, { $set: { 'type': req.body.type }}, function (err) {
                    if (!err) {
                        response.success = "Successfully updated the user's type.";
                        res.json(response);
                    } else {
                        response.error = "Could not update the user's type.";
                        res.status(400).json(response);
                    }
                });
            } else {
                response.error = "Could not find the specified user.";
                res.status(400).json(response);
            }
        });
    } else {
        response.error = "Invalid request.";
        res.status(400).json(response);
    }
};
