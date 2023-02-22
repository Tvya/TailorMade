require('dotenv').config()
const jwt = require("jsonwebtoken")

const Auth = async (req,res,next) => {
    try{
        
        const jwtToken = req.header("token")

        if(!jwtToken){
            return res.status(403).json("Not Authorize")
        }

        const payload = jwt.verify(jwtToken, process.env.JWTSECRET)

        req.user = payload.user

    }
    catch(err){
        console.error(err.message)
        return res.status(403).json("Not Authorize")
    }
};

module.exports = Auth