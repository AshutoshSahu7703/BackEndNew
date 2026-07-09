
const userModel=require("../models/user.model")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

async function registerController(req,res){

    const {name,email,password,bio,profileImage}=req.body

    const isUserAlreadyExist= await userModel.findOne({
        $or:[
            {name},
            {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User already exist"+(isUserAlreadyExist.email === email?"with this email":"with this username")
        })
    }
    
    const hash = bcrypt.hash(password,10)

    const user = await userModel.create({
        name,
        email,
        password:hash,
        bio,
        profileImage
    })

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("jwt-token",token)

    res.status(200).json({
        message:"User registered Successfully",
        user:{
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
        }
    })
    
}

async function logInController(req,res){
    const {email,name,password}=req.body

    const user = await userModel.findOne({
        $or:[
        {
            name:name
        },
        {
            email:email
        }
    ]
    })

    if(!user){
        return res.status(404).json({
            message:"user not resgistered yet"
        })
    }

    const isPasswordValid= await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        res.status(401).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("jwt-token",token)

    res.status(201).json({
        message:"user logged in",
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports={
    registerController,
    logInController
}

