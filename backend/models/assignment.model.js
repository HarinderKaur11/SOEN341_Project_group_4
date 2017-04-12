'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var evaluationModel = new Schema({
    date: Number,
    courseID: Number,
    description: String,
    weight: Number
});

module.exports = mongoose.model('evaluation', evaluationModel);
