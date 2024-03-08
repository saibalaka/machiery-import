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

//to get the product by id
const getProductById= async(req,res)=>{
    let product = await Product.findOne({_id:req.params.id})
    res.status(200).send({message:"got the product",payload:product})
}

//to create new product
const createProduct = async(req,res)=>{
    let product = req.body
    // product.image=req.file.url;
    let existingProduct = await Product.findOne({$and:[{title:product.title},{sellername:product.sellername}]})
    if(existingProduct!==null){
        res.status(200).send({message:"product already exists please update the existing product"})
    }else{
        let productDoc = await Product.create(product)
        res.status(200).send({message:"created a new product",payload:productDoc})
    }
}

//to update the product
const updateProduct = async(req,res)=>{
    console.log("req.body is ",req.body)
    let updatedProduct = await Product.findByIdAndUpdate(req.body._id,req.body)
    res.status(200).send({message:"updated a product",payload:updatedProduct})
}

//to remove the product
const removeProduct = async(req,res)=>{
    let removed = await Product.deleteOne({_id:req.params.id})
    res.status(200).send({message:"remove a product",payload:removed})

}

//exporting the request handlers
module.exports = {getProducts,getProductsBySellername,getProductById,createProduct,updateProduct,removeProduct}