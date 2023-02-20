const jwt = require("jsonwebtoken")

function Authentication(req,res,next){
    const token = req.headers.authorization;
    jwt.verify(token,"LinkedIn",(err,decod)=>{
        if(err){
            res.send({"msg":"Please Login First","error":err})
        }
        else{
            req.body.userID = decod.userId;
            next();
        }
    })
}

module.exports={
    Authentication
}