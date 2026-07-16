const postModel=require("../models/post.model")

const likeModel=require("../models/like.model")

const jwt = require("jsonwebtoken")

const ImageKit=require("@imagekit/nodejs")
const { default: mongoose } = require("mongoose")
const { post } = require("../routes/post.routes")

const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,   // ye undefined aa raha hai
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function createPost(req, res) {

    if (!req.file) {
    return res.status(400).json({ message: "Please upload an image" });
    }
    
    const file=await imagekit.files.upload({
        file:await ImageKit.toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test",
        folder:"Cohort-2-Insta-Clone-Posts"
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imageUrl:file.url,
        user:req.user.id
    })

    res.status(201).json({
        message:"Post created successfully",
        post
    })

}

async function getPost(req,res){

    const userId=req.user.id

    const posts =  await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"Posts fetched Successfully",
        posts 
    })


}

async function getPostDetails(req,res){

    const userId=req.user.id

    const postId=req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post Not Found"
        })
    }

    const isValidUser= post.user.toString()===userId

    if(!isValidUser){
        return res.status(403).json({
            message:"forbidden content"
        })
    }

    return res.status(200).json({
        message:"Post Fetched Successfully",
        post
    })

}

async function likePost(req,res){

      const userName = req.user.id
      const postId=req.params.postId

      const post = await postModel.findById(postId)

      if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
      }

        const isAlreadyLiked= await likeModel.findOne({
            post:postId,
            user:userName
        })

      if(isAlreadyLiked){
        return res.status(400).json({
            message:"Post already liked"
        })
      }

      const like = await likeModel.create({
        post:postId,
        user:userName
      })

      return res.status(200).json({
        message:"Post liked successfully",
        like
      })
}

module.exports={
    createPost,
    getPost,
    getPostDetails,
    likePost
}