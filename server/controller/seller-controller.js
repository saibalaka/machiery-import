const {Seller} = require('../db')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

//create new Seller
const creatNewSeller = async(req,res)=>{
    let user = await Seller.findOne({username:req.body.username})
    if(user!==null){
        res.send({message:"user already exists"})
    }
    else{
        let userDocument = new Seller(req.body)
        //if new hash the password
        let hashedPassword = await bcryptjs.hash(userDocument.password,5)
        userDocument.password = hashedPassword;
        //save the user
        let user = await userDocument.save()
        
        res.send({message:"user created",payload:user})
    }
}


module.exports = {creatNewSeller}