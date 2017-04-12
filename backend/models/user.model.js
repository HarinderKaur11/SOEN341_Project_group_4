'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userModel = new Schema({
    name: String,
    username: String,
    password: String,
    type: String,
    courses: [{ type: Schema.Types.ObjectId, ref: 'course' }]
});

module.exports = mongoose.model('user', userModel);