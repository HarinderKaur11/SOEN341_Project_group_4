var mongoose = require('mongoose');

var examModel = new mongoose.Schema({
    id: Number,
    date: Number,
    length: Number,
    courseID: Number,
    description: String,
    weight: Number
});

Exam = mongoose.model('exam', examModel);

module.exports = Exam;