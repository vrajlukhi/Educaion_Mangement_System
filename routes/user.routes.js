const {Router}  = require("express")
const { signup, login } = require("../controllers/user.controller")
const uRoute = Router()

uRoute.post("/signup" , signup)
uRoute.post("/login" , login)

module.exports = uRoute