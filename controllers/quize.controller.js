const Assignment = require("../models/assignment.model");
const Course = require("../models/course.model");
const Quiz = require("../models/Quizemodel");

// Teacher: Update course assignments
const uploadAssignment = async (req, res) => {
    try {
      const { courseId, assignmentTitle, assignmentDescription, fileUrl } = req.body;
      const course = await Course.findById(courseId);
  
      // Create and add new assignment to the course
      const assignment = new Assignment({
        course: courseId,
        title: assignmentTitle,
        description: assignmentDescription,
        fileUrl,
      });
  
      await assignment.save();
      
      course.assignments.push(assignment._id);
      await course.save();
  
      res.status(201).json({ message: 'Assignment uploaded successfully', assignment });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Teacher: Create a quiz for the course
  const createQuiz = async (req, res) => {
    try {
      const { courseId, quizTitle, questions } = req.body;
      const course = await Course.findById(courseId);
  
      // Create a new quiz and link it to the course
      const quiz = new Quiz({
        course: courseId,
        title: quizTitle,
        questions,
      });
  
      await quiz.save();
  
      course.quizzes.push(quiz._id);
      await course.save();
  
      res.status(201).json({ message: 'Quiz created successfully', quiz });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = {uploadAssignment , createQuiz}