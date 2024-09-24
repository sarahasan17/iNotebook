var jwt = require("jsonwebtoken");
const SECRET_TOKEN = "saraisagoodgirl";

const fetchUser=(req,res,next)=>{
    const token=req.header('auth_token')
    if(!token){
        return res.status(401).json({error:"token not found"});
    }
    try{
        const data = jwt.verify(token, SECRET_TOKEN);
        req.user=data.user
        next()
    }catch{
        return res.status(401).json({ error: "token not found" });
    }
}

module.exports = fetchUser;
