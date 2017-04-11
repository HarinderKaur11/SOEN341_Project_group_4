var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var evaluationModel = Schema({
    date: Number,
    courseID: Number,
    description: String,
    weight: Number
});

Evaluation = mongoose.model('evaluation', evaluationModel);

module.exports = Evaluation;
