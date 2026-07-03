const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"User already exist with this username"],
        required:[true,"User name is required"]
    },
    email:{
        type:String,
        unique:[true,"User already exist with this email"],
        required:[true,"User email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:"Day-11-Insta-Clone\x543c3130fba0be6cfda40c0db5fe74c1.jpg"
    }

})