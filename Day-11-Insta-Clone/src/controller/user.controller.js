const followModel=require("../models/follow.model")
const userModel = require("../models/user.model")

async function followController(req,res){

const followerUserName=req.user.username 

const followeeUserName=req.params.username

if(followeeUserName==followerUserName){
    return res.status(400).json({
        message:"You can't follow yourself"
    })
}

const isFolloweeExist= await userModel.findOne({
    followee:followeeUserName
})

if(!isFolloweeExist){
   return res.status(404).json({
    message:"The user you want to follow is not exist"
   })
}

const isAlreadyFollow= await followModel.findOne({
    followee:followeeUserName,
    follower:followerUserName
})

if(isAlreadyFollow){
    return res.status(200).json({
        message:"You are already following this user",
        isAlreadyFollow
    })
}

const followRecord= await followModel.create({

    follower:followerUserName,
    followee:followeeUserName
})

res.status(201).json({
    message:`You are now following ${followeeUserName}`,
    followRecord
})

}

async function unfollowController(req,res){

    const followerUserName=req.user.username 

    const followeeUserName=req.params.username

    const isFollowing= await followModel.findOne({
        followee:followeeUserName,
        follower:followerUserName
    })

    if(!isFollowing){
        return res.status(200).json({
            message:"You are not following this user"
        })
    }

    const unfollowRecord=await followModel.findByIdAndDelete(isFollowing._id)

    return res.status(200).json({
        message:`You have unfollowed ${followeeUserName}`
    })


}

module.exports={
    followController,
    unfollowController
}