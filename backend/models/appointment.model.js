var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var appointmentModel = Schema({
    date: Number,
    location: String,
    teacherID: Number,
    courseID: Number,
    reason: String
});

Appointment = mongoose.model('appointment', appointmentModel);

module.exports = Appointment;