var mongoose = require('mongoose');

var evaluationModel = new mongoose.Schema({
    id: Number,
    date: Number,
    courseID: Number,
    description: String,
    weight: Number
});

Evaluation = mongoose.model('evaluation', evaluationModel);

module.exports = Evaluation;
