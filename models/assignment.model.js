const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title : String,
  description : String,
  fileUrl: { type: String}, 
  submittedAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment