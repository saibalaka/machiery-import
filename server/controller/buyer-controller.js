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

//req handler for getting requests array
const buyerRequests = async(req,res)=>{
    let requests = await Buyer.findOne({username:req.params.username})
    res.send({message:"got the requests list ",payload:requests.requests})
}

//req handler for getting users details
const buyerDetails = async(req,res)=>{
    let user = await Buyer.findOne({username:req.params.username})
    res.send({message:"got the buyer details ",payload:user})
}

//req handler for getting users details
const buyerDetailsById = async(req,res)=>{
    let user = await Buyer.findById(req.params.id)
    res.send({message:"got the buyer details by id",payload:user})
}

//req handler for updating buyer requests
const updateRequest = async(req,res)=>{
    let buyer = await Buyer.findOne({_id:req.body.buyerId})
    console.log("buyer is ",buyer)
    if(buyer===null){
        res.send({message:"buyer does not exist"})
    }else{
        buyer.requests.push(req.body)
        console.log("buyer after update is ",buyer)
        let updatedUser = await Buyer.findByIdAndUpdate(req.body.buyerId,buyer)
        res.send({message:"req added",payload:updatedUser})
    }
}

//req handler for deleteing buyer request
const deleteRequest = async(req,res)=>{
    let id = req.body.buyerId
    let index = req.body.index
    let buyer = await Buyer.findById(req.body.buyerId)
    console.log("buyer details ",buyer)
    console.log("index is ",req.body.index)
    buyer.requests.splice(index,1)
    console.log("after delete ",buyer)
    let updated = await Buyer.findByIdAndUpdate(id,buyer)
    res.send({message:"deleted the data ",updated})
}

//update status 
const updateStatus = async(req,res)=>{
    let id = req.body.buyerId
    let index = req.body.index
    let status = req.body.status
    let buyer = await Buyer.findById(id)
    buyer.requests[index].status = status;
    let updated = await Buyer.findByIdAndUpdate(id,buyer)
    res.send({message:"updated status is ",updated})
}


module.exports = {creatNewBuyer,buyerLogin,buyerRequests,buyerDetails,updateRequest,deleteRequest,updateStatus,buyerDetailsById}