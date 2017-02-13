var mongoose = require('mongoose');

var assignmentModel = new mongoose.Schema({
    id: Number,
    date: Number,
    courseID: Number,
    description: String,
    weight: Number
});

Assignment = mongoose.model('assignment', assignmentModel);

module.exports = Assignment;