    const jwt = require("jsonwebtoken")

    async function identifyUser(req,res,next) {

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

    req.user=decoded

    next()
        
    }

    module.exports=identifyUser