var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userModel = Schema({
    username: String,
    password: String,
    type: String,
    courses: [{ type: Schema.Types.ObjectId, ref: 'course' }]
});

module.exports = mongoose.model('user', userModel);