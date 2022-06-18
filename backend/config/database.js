const mongoose = require("mongoose");

exports.connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URL).then((con) => {
        console.log(`Database Connnected: ${con.connection.host}`)
    }).catch((error) => {
        console.log(error)
    })
}