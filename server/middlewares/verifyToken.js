const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req,res,next){
    //logic for token verfication
    //get the token from the client
    const baerarToken = req.headers.authorization
    if(baerarToken===undefined){
        res.send({message:"unauthorized access"})
    }else{
        const token = baerarToken.split(' ')[1]
        //verify the token
        let decodedToken = jwt.verify(token,process.env.SECRET_KEY)
        next()
    }
}

module.exports = verifyToken