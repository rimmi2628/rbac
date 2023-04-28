const jwt=require('jsonwebtoken');
const models = require('../models');
const User = models.User;
const beareer=async(req,res,next)=>{
    const token=req.headers['authorization'];
    if(!token){
        res.status(500).json({message:"invalid token"});
    }
    else{
        const bearer=token.split(" ");
        const value=bearer[1];
        // req.token=value;
        const user=jwt.verify(value,process.env.secretkey);
        if(!user){
            return res.json({"msg":"please login to continue"})
        }
        const userda = await User.findOne({where:{id:user.id}});
        req.user = userda;
        
    }




    next();
}

module.exports=beareer;