const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signup = async(req , res) =>{
    const {username , email , password , role} = req.body
    const user = await User.findOne({email : email})

    if(!user){
        bcrypt.hash(password , 5 , async(err , hash)=>{
            let obj = {
                username : username,
                email : email,
                role : role,
                password : hash
            }

            let user = await User.create(obj)
            res.status(200).json(user)
        })
    }
    else{
        res.status(400).json({msg : "This email is already exists"})
    }
}



const login = async (req, res) => {
    const { email, password } = req.body;
    let data = await User.findOne({ email: email });
    if (data) {
      bcrypt.compare(password, data.password, (err, result) => {
        if (result) {
          let token = jwt.sign({ id: data._id }, process.env.jwtSecrate);
          res.cookie("token", token).cookie("id", data._id).cookie("role" , data.role);
          res.status(200).json({ message: "Successfully Login", data , token});
        } else {
          res.status(400).json({ message: "Password incorrect" });
        }
      });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  };
  


  module.exports = {signup , login}