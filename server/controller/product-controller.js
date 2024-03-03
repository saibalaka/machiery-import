const {Product} = require('../db')

//to get all the products
const getProducts = async(req,res)=>{
    let productsList = await Product.find()
    res.status(200).send({message:"got all the products",payload:productsList})
}

//to get the products by seller name
const getProductsBySellername = async(req,res)=>{
    let productsList = await Product.find({sellername:req.params.sellername})
    res.status(200).send({message:"got products of seller",payload:productsList})

}

//to create new product
const createProduct = async(req,res)=>{
    let product = req.body
    res.status(200).send({message:"created a new product",payload:product})
}

//to update the product
const updateProduct = async(req,res)=>{
    res.status(200).send({message:"updated a product"})

}

//to remove the product
const removeProduct = async(req,res)=>{
    res.status(200).send({message:"remove a product"})

}

//exporting the request handlers
module.exports = {getProducts,getProductsBySellername,createProduct,updateProduct,removeProduct}