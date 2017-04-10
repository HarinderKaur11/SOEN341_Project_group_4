var mongoose = require('mongoose');

var courseModel = new mongoose.Schema({
  courseId: Number,
  teacher: Number,
  name: String,
  uniqueId: String,
  students: Array
});
  
module.exports = mongoose.model('course', courseModel);
