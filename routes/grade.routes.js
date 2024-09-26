const {Router} = require("express")
const { Teacher, student, Auth, authorize } = require("../middlewares/auth")
const { assignGrade, getGrades, getCourseAnalytics } = require("../controllers/grade.controller")
const gRoute = Router()


gRoute.post("/" , Auth , Teacher , assignGrade)
gRoute.get("/" , Auth , student , getGrades)
gRoute.get("/Analytics/:courseId", Auth , authorize , getCourseAnalytics)

module.exports = gRoute