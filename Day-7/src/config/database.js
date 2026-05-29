const mongoose = require("mongoose")
const dotenv = require("dotenv")
const dns = require("dns")

dns.setServers(["8.8.8.8", "8.8.4.4"])
dotenv.config()

function connectToDB(){
    
    mongoose.connect(process.env.link)
    .then(()=>{
        console.log("server is connected to database");
    })
    .catch((err)=>{
        console.log("DB connection failed:", err.message)
    })
}

module.exports = connectToDB