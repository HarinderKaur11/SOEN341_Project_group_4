var mongoose = require('mongoose');

var userModel = new mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    type: String
});

module.exports = mongoose.model('user', userModel);