const {Router} = require("express")
const { addCoures, updateCourse, deleteCourse, selfEnroll, submitAssignment, enrollStudent, removeStudent, getEnrolledCourses, getMySubmissions, updateSubmission, deleteSubmission } = require("../controllers/coures.controller")
const { Auth, authorize, admin, student } = require("../middlewares/auth")
const cRoute = Router()

cRoute.post("/add" , admin, addCoures)
cRoute.patch("/upadate/:id" , Auth , authorize , updateCourse)
cRoute.delete("/delete/:id", admin , deleteCourse)
cRoute.post("/self" , Auth ,  student , selfEnroll)
cRoute.post("/submit" , Auth ,  student , submitAssignment)
cRoute.post("/enroll" , Auth ,  admin , enrollStudent)
cRoute.post("/remove" , Auth ,  admin , removeStudent)
cRoute.get("/getenroll" , Auth , student , getEnrolledCourses)
cRoute.get("/my-submissions" , Auth ,  student , getMySubmissions)
cRoute.patch("/upadatesub/:id" , Auth ,  student , updateSubmission  )
cRoute.delete("/deletesub/:id" , Auth ,  student , deleteSubmission )

module.exports = cRoute