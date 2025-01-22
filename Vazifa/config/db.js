const mongoose = require("mongoose")
require("dotenv").config()

let url = process.env.MONGO_URL

async function connectDB() {
    try {
        let connect = mongoose.connect(url)
        console.log("Connect Db✅");
        
    } catch (error) {
        console.log(error.message);
        
    }
}


module.exports = connectDB