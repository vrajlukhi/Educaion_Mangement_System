const Course = require("../models/course.model");
const Grade = require("../models/grade.model");

const assignGrade = async (req, res) => {
    try {
      const newGrade = await Grade.create(req.body)
      res.status(201).json(newGrade);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  const getGrades = async (req, res) => {
    try {
      const grades = await Grade.find({ student: req.body.enrolledStudents}).populate('course', 'title');
      res.status(200).json(grades);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  // Calculate the average grade and number of enrolled students for a course
const getCourseAnalytics = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Ensure that the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // 1. Aggregate average grade per course
    const averageGradePipeline = [
      { $match: { course: courseId } },
      { $group: {
          _id: '$course',
          averageGrade: { $avg: '$grade' }
        }
      }
    ];

    const averageGradeResult = await Grade.aggregate(averageGradePipeline);

    const averageGrade = averageGradeResult.length > 0 ? averageGradeResult[0].averageGrade : null;

    // 2. Count the number of enrolled students
    const enrolledStudentsCount = await Course.aggregate([
      { $match: { _id: course._id } },
      { $project: { numberOfStudents: { $size: '$enrolledStudents' } } }
    ]);

    const numberOfStudents = enrolledStudentsCount.length > 0 ? enrolledStudentsCount[0].numberOfStudents : 0;

    // Send the response with both average grade and number of students
    res.status(200).json({
      course: course.title,
      averageGrade,
      numberOfStudents
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  module.exports = {assignGrade , getGrades , getCourseAnalytics}