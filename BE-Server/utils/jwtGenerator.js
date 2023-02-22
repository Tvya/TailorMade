require('dotenv').config()
const jwt = require("jsonwebtoken")


function jwtGenerator(email){
    const payload = {
        user: email
    }

    return jwt.sign(payload, process.env.JWTSECRET, {expiresIn: "1hr"})
}

module.exports = jwtGenerator