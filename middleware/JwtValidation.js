const jwt=require('jsonwebtoken');
require('dotenv').config();
const JwtValidation=(req,res,next)=>{
    try {
        const secret=process.env.SECRET;
        const token=req.headers.auth;
        if(!token)
        {
            return res.status(400).json({message:'UnAuthorized!...'})
        }
        const payload=jwt.verify(token,secret);
        req.manager=payload._id;
        next() 
    } catch (error) {
        res.status(500).json({message:'Some issue occured'})
    }

}


module.exports=JwtValidation;