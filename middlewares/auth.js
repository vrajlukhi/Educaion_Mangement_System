const jwt = require("jsonwebtoken");


const Auth = (req, res, next) => {
    let { token } = req.cookies
      
    if (token) {
      let decode = jwt.verify(token, process.env.jwtSecrate);
      req.body.enrolledStudents = decode.id
      next();
    } else {
      res.json("first login")
    }
  };


const authorize = (req, res, next) => {
    if (req.cookies.role == "Admin") {
      next();
    } 
    else if (req.cookies.role == "Teacher") {
      next()
    }
    else {
      res.send("You are not authorized to access this page.");
    }
  };

  const admin = (req , res , next) =>{
    if (req.cookies.role !== "Admin") {
      res.send("You are not authorized to access this page.");
    } 
    else{
      next()
    }
  }

  const student = (req , res , next) =>{
    if (req.cookies.role !== "Student") {
      res.send("You are not authorized to access this page.");
    } 
    else{
      next()
    }
  }

  const Teacher = (req , res , next) =>{
    if (req.cookies.role !== "Teacher") {
      res.send("You are not authorized to access this page.");
    } 
    else{
      next()
    }
  }

module.exports = {Auth,authorize , admin , student , Teacher};