const express=require("express")

const postRouter=express.Router()

const multer = require("multer")

const upload = multer({storage:multer.memoryStorage()})

const postController=require("../controller/post.controller")

const identifyUser=require("../middlewares/auth.middleware")

postRouter.post("/",upload.single("image"),identifyUser,postController.createPost)

postRouter.get("/",identifyUser,postController.getPost)

postRouter.get("/details/:postId",identifyUser,postController.getPostDetails)

postRouter.post("/like/:postId",identifyUser,postController.likePost)

module.exports=postRouter



