const postModel=require("../models/post.model")

const jwt = require("jsonwebtoken")

const ImageKit=require("@imagekit/nodejs")

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
   
    const token = req.cookies["jwt-token"]

    if(!token){
        return res.status(401).json({
            message:"Token not providedm, Unauthorized access"
        })
    }

    let decoded

    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:"User not Authorized"
        })
    }

    const post = await postModel.create({
        caption:req.body.caption,
        imageUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({
        message:"Post created successfully",
        post
    })

}

async function getPost(req,res){
    const token=req.cookies["jwt-token"]

    if(!token){
        return res.status(401).json({
            message:"Unauthorized Access"
        })
    }

    let decoded 
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
    }
    catch(err){
        return res.status(401).json({
            message:"Unauthorized acess"
        })
    }

    const userId=decoded.id

    const posts =  await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"Posts fetched Successfully",
        posts 
    })


}

module.exports={
    createPost,
    getPost
}