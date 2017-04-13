var mongoose = require('mongoose');

var announcementModel = new mongoose.Schema({
    id: Number,
    courseId: Number,
    title: String,
    message: String,
    date: Date
});

Announcement = mongoose.model('announcement', announcementModel);

module.exports = Announcement;
