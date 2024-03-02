const {Buyer} = require('../db')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

//create new buyer
const creatNewBuyer = async(req,res)=>{
    let user = await Buyer.findOne({username:req.body.username})
    if(user!==null){
        res.status(200).send({message:"user already exists"})
    }
    else{
        let userDocument = new Buyer(req.body)
        //if new hash the password
        let hashedPassword = await bcryptjs.hash(userDocument.password,5)
        userDocument.password = hashedPassword;
        //save the user
        let user = await userDocument.save()
        
        res.status(200).send({message:"user created",payload:user})
    }
}

//to check and login the user
const buyerLogin = async(req,res)=>{
    //get the user credentials 
    let userCred = req.body
    //check wheather the user exist or not
    let userOfDB = await Buyer.findOne({username:userCred.username})
    //if user not there
    if(userOfDB===null){
        res.status(200).send({message:"Invalid user"})
    }
    //if user present
    else{
        //compare passwords
        let result = await bcryptjs.compare(userCred.password,userOfDB.password)
        //if passwords matched
        if(result){
            //create a signed token
            let signedToken = jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:160})
            //send res
            res.status(200).send({message:"Login success",token:signedToken,payload:userOfDB})
        }
        //else passwords not matched
        else{
            res.status(200).send({message:"Invalid password"})
        }
    }
}


module.exports = {creatNewBuyer,buyerLogin}