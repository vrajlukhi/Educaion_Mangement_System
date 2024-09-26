const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  grade: { type: Number},
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  submissionDate: { type: Date, default: Date.now },
});

const Grade = mongoose.model('Grade', gradeSchema);
module.exports = Grade