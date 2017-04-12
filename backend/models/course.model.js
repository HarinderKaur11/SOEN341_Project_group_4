'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var courseModel = new Schema({
    teacher: { type: Schema.Types.ObjectId, ref: 'user' },
    name: String,
    shortName: String,
    students: [{ type: Schema.Types.ObjectId, ref: 'user' }]
});

module.exports = mongoose.model('course', courseModel);
