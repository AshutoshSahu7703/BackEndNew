const mongoose = require("mongoose")

const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        type:String,
        required:[true,"ImageURL is required for post Creation"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User Id is required for Post creation"]
    }
})

const postModel=mongoose.model("posts",postSchema)

module.exports=postModel