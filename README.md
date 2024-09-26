Education Management System Backend API

- Description
  - This project is a backend API for an Education Management System built using Node.js, Express, and MongoDB. The API handles user authentication, course management, enrollment, assignment submissions, grading, and provides course analytics like the average grade per course and the number of students enrolled in each course.

- Features
  
  1.User Authentication:
    -JWT-based authentication for login and signup.
    -Role-based access control for different user types: Admin, Teacher, and Student.
  
  2.Course Management:
    - Admins can create, update, and delete courses.
    - Teachers can update course content, upload assignments, and create quizzes.
    - Students can enroll in courses and submit assignments.

  3.Enrollment Management:
    -Admins can enroll and remove students from courses.
    -Students can view their enrollment status.

  4.Grade Management:
    - Teachers can assign grades to students.
    - Students can view their grades for each course.

  5.Assignment Submissions:
    - Students can submit assignments and view their submission details.
    - Teachers can view student submissions and grade them.

  6.Course Analytics:
    - Average grade per course.
    - Number of enrolled students per course.
 
  7.Security:
    - Passwords are securely hashed using bcrypt.
    - All sensitive routes are protected using JWT and role-based authorization.

- Database Models

  1.User:
    - Roles: Admin, Teacher, Student.
    - Stores user credentials and role information.

  2.Course:
    - Stores information about each course (e.g., title, description, dates, assigned teacher, enrolled students).

  3.Content:
    - Stores course content, including assignments and quizzes.

  4.Submission:
    - Stores information about student submissions, including assignment files, submission date, and grades.

  5.Grade:
    - Stores the grade a teacher assigns to a student for a specific course.
 
- Error Handling
  - Proper status codes (e.g., 404 for not found, 401 for unauthorized access).
  - Detailed error messages for debugging and clarity.
 
- Security
  - Password Hashing: All passwords are securely hashed using bcrypt.
  - JWT Authentication: Routes are protected using JWT-based authentication. Each user receives a token on login, which must be included in the Authorization header to access protected routes.

- Course Analytics
  - Average Grade per Course: Aggregation queries are used to calculate the average grade of students per course.
  - Number of Enrolled Students: Aggregation to count the number of students enrolled in each course.
 
- Author
  - Vraj Lukhi – Backend Developer
 
- Conclusion
  - The Education Management System Backend API offers a secure, scalable solution for managing users, courses, enrollments, assignments, and grades. Built with Node.js, Express, and MongoDB, it provides role-based access control and course analytics, making it an ideal tool for educational institutions. With potential for further enhancements like real-time notifications, it’s a flexible foundation for efficient education management. Contributions are welcome to improve or extend the system for broader use cases.
