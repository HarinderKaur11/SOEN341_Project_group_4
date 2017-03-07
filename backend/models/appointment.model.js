var mongoose = require('mongoose');

var appointmentModel = new mongoose.Schema({
    id: Number,
    date: Number,
    location: String,
    teacherID: Number,
    courseID: Number,
    reason: String
});

Appointment = mongoose.model('appointment', appointmentModel);

module.exports = Appointment;