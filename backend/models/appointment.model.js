'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var appointmentModel = new Schema({
    date: Number,
    location: String,
    teacherID: Number,
    courseID: Number,
    reason: String
});

module.exports = mongoose.model('appointment', appointmentModel);