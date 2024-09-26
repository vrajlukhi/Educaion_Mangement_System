const Assignment = require("../models/assignment.model");
const Course = require("../models/course.model");
const User = require("../models/user.model");

const addCoures = async (req, res) => {
    try {
        const data = await Course.create(req.body);
        res.status(201).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const updateCourse = async (req, res) => {
    try {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json(course);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  const deleteCourse = async (req, res) => {
    try {
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) return res.status(404).json({ message: 'Course not found' });
      res.status(200).json({ message: 'Course deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // enrollement part 

  // Enroll student in a course (self-enrollment)
  const selfEnroll = async (req, res) => {
    try {
      const { courseId } = req.body;
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Check if student is already enrolled
      if (course.enrolledStudents.includes(req.body.enrolledStudents)) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
      }
  
      // Enroll student
      course.enrolledStudents.push(req.body.enrolledStudents);
      await course.save();
  
      res.status(200).json({ message: 'Enrolled successfully', course });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//   student submit assignment
  const submitAssignment = async (req, res) => {
    try {
      const { courseId, fileUrl } = req.body;
      const course = await Course.findById(courseId);
  
      // Check if the student is enrolled in the course
      if (!course.enrolledStudents.includes(req.body.enrolledStudents)) {
        return res.status(403).json({ message: 'Not enrolled in this course' });
      }
  
      // Create and save the assignment submission
      const assignment = new Assignment({
        student: req.body.enrolledStudents,
        course: courseId,
        fileUrl,
      });
      
      await assignment.save();
      res.status(201).json({ message: 'Assignment submitted successfully', assignment });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  // admin can enroll student from course
  const enrollStudent = async (req, res) => {
    try {
      const { studentId, courseId } = req.body;
      const course = await Course.findById(courseId);
      const student = await User.findById(studentId);
      
      if (!course || !student) {
        return res.status(404).json({ message: 'Course or student not found' });
      }
  
      course.enrolledStudents.push(studentId);
      await course.save();
      
      res.status(200).json({ message: 'Student enrolled successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
   // admin can remove student from course
  const removeStudent = async (req, res) => {
    try {
      const { studentId, courseId } = req.body;
      const course = await Course.findById(courseId);
      
      if (!course) return res.status(404).json({ message: 'Course not found' });
      
      course.enrolledStudents.pull(studentId);
      await course.save();
      
      res.status(200).json({ message: 'Student removed successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  // student can view their enrollement status

  const getEnrolledCourses = async (req, res) => {
    try {
      const courses = await Course.find({ enrolledStudents: req.body.enrolledStudents})
                                  .populate('enrolledStudents', 'username');
      
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  // View own submissions
const getMySubmissions = async (req, res) => {
  try {
    const assignments = await Assignment.find({ student: req.body.enrolledStudents})
                                        .populate('course', 'title');
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update assignment submission
const updateSubmission = async (req, res) => {
  try {
    const { fileUrl } = req.body;
    const assignment = await Assignment.findOne({ _id: req.params.id, student: req.body.enrolledStudents });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    assignment.fileUrl = fileUrl;  // Update the assignment URL
    await assignment.save();

    res.status(200).json({ message: 'Assignment updated successfully', assignment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete assignment submission
const deleteSubmission = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndDelete({ _id: req.params.id, student:req.body.enrolledStudents});

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {addCoures , updateCourse , deleteCourse , selfEnroll , submitAssignment , enrollStudent , removeStudent , getEnrolledCourses , getMySubmissions , updateSubmission , deleteSubmission}