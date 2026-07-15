const followModel=require("../models/follow.model")

async function followController(req,res){

const followerUserName=req.user.username 

const followeeUserName=req.params.username



}

module.exports={
    followController
}