exports.getAnnouncements = function(req, res, next) {
    var response = {};

    if (req.params.courseId) {
        models.courseModel.findOne({ _id: req.params.courseId }, function(err, course) {
            if (err) {
                response.error = "Invalid request.";
                res.status(400).json(response);
            } else {
                if (course) {
                    
                } else {
                    response.error = "Could not find course.";
                    res.status(400).json(response);
                }
            }
        });
    } else {
        response.error = "Invalid request parameters.";
        res.status(400).json(response);
    }
};

exports.addAnnouncement = function(req, res, next) {

};

exports.deleteAnnouncement = function(req, res, next) {

};
