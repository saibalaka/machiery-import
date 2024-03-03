//import mongoose
const mongoose = require('mongoose')
require('dotenv').config()
const DB_URL = process.env.MONGO_DB_URL

//connect to DB
mongoose.connect(DB_URL)
.then(()=>{
    console.log("successfully connected to mongodb server")
})
.catch(err=>{
    console.log("error occured connecting mongoose ",err)
})

//user schema
const buyerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required but missing'],
        minLength:[3,'minimumlength should be 3 letters']
    },
    password:String,
    email:String,
    companyname:String,
    requests:[]
})

//create Model(class) for buyerSchema
const Buyer = mongoose.model('buyer',buyerSchema)



//seller schema
const sellerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'username is required but missing'],
        minLength:[3,'minimumlength should be 3 letters']
    },
    password:String,
    email:String,
    companyname:String,
    requests:[]
})

//create sellerSchema model
const Seller = mongoose.model('seller',sellerSchema)

//importer schema
const importerSchema = new mongoose.Schema({
    companyName:String,
    typeOfBuss:String,
    name:String,
    emailId:String,
    phone:Number,
    quoteStatus:String,
    address:{
        city:String,
        country:String,
        pinCode:Number
    }
})

//create importer model
const Importer = mongoose.model('importer',importerSchema)

//products schema
const productSchema = new mongoose.Schema({
    title:String,
    image:String,
    discription:String,
    cost:Number,
    madein:String,
    manufacturer:String,
    sellername:String
})

//create product model
const Product = mongoose.model('product',productSchema)

//export user model
module.exports = {Buyer,Seller,Importer,Product}