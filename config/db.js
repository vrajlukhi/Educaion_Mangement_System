const mongoose = require("mongoose")

const connect = async () => {
    await mongoose.connect(process.env.SERVER)
    console.log("database is connected")
}

module.exports = connect