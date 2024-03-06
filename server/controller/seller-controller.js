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

//to check and login the user
const sellerLogin = async(req,res)=>{
    //get the user credentials 
    let userCred = req.body
    //check wheather the user exist or not
    let userOfDB = await Seller.findOne({username:userCred.username})
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
            console.log("user is ",userOfDB)
        }
        //else passwords not matched
        else{
            res.status(200).send({message:"Invalid password"})
        }
    }
}

//req handler for getting requests array
const sellerRequests = async(req,res)=>{
    let requests = await Seller.findOne({username:req.params.username})
    res.send({message:"got the requests list ",payload:requests.requests})
}

//req handler for getting users details
const sellerDetails = async(req,res)=>{
    let user = await Seller.findOne({username:req.params.username})
    res.send({message:"got the seller details ",payload:user})
}

//req handler for getting users details
const sellerDetailsById = async(req,res)=>{
    let user = await Seller.findById(req.params.id)
    res.send({message:"got the seller details by id ",payload:user})
}


//req handler for updating seller requests
const updateRequest = async(req,res)=>{
    let seller = await Seller.findOne({_id:req.body.sellerId})
    console.log("seller is ",seller)
    if(seller===null){
        res.send({message:"seller does not exist"})
    }else{
        seller.requests.push(req.body)
        console.log("seller after update is ",seller)
        let updatedUser = await Seller.findByIdAndUpdate(req.body.sellerId,seller)
        res.send({message:"req added",payload:updatedUser})
    }
}

//req handler for deleteing seller request
const deleteRequest = async(req,res)=>{
    let id = req.body.sellerId
    let index = req.body.index
    let seller = await Seller.findById(req.body.sellerId)
    console.log("seller details ",seller)
    console.log("index is ",req.body.index)
    seller.requests.splice(index,1)
    console.log("after delete ",seller)
    let updated = await Seller.findByIdAndUpdate(id,seller)
    res.send({message:"deleted the data ",updated})
}

//update status 
const updateStatus = async(req,res)=>{
    let id = req.body.sellerId
    let index = req.body.index
    let status = req.body.status
    let seller = await Seller.findById(id)
    seller.requests[index].status = status;
    let updated = await Seller.findByIdAndUpdate(id,seller)
    res.send({message:"updated status is ",updated})
}

module.exports = {creatNewSeller,sellerLogin,sellerRequests,sellerDetails,updateRequest,deleteRequest,updateStatus,sellerDetailsById}