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

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

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

module.exports={
    createPost,
}