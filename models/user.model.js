const mongoose = require("mongoose");
const { type } = require("os");

const usermodel = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role :{
    type:String,
    enum : ["Admin" , "Teacher" , "Student"],
    default : "Student"
  }
},{timestamps : true});

let User = mongoose.model("User", usermodel);

module.exports = User;