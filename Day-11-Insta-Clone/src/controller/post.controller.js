const postModel=require("../models/post.model")

const ImageKit=require("@imagekit/nodejs")

const imagekit=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,   // ye undefined aa raha hai
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

async function createPost(req, res) {
    console.log("Body:", req.body);  
    console.log("File:", req.file); 
    
    const file=await imagekit.files.upload({
        file:await ImageKit.toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test"
    })

    res.send(file)
}

module.exports={
    createPost,
}