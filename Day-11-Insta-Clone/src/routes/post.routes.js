const express=require("express")

const postRouter=express.Router()

const multer = require("multer")

const upload = multer({storage:multer.memoryStorage()})

const postController=require("../controller/post.controller")

postRouter.post("/",upload.single("image"),postController.createPost)

module.exports=postRouter



