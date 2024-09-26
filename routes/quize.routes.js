const {Router} = require("express")
const { Auth, Teacher } = require("../middlewares/auth")
const { uploadAssignment, createQuiz } = require("../controllers/quize.controller")
const qRouete = Router()


qRouete.post("/upload-assignment" , Auth , Teacher , uploadAssignment)
qRouete.post("/create-quiz" , Auth , Teacher , createQuiz)

module.exports = qRouete