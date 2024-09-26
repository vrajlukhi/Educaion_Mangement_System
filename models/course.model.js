const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  enrolledStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }] ,
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course