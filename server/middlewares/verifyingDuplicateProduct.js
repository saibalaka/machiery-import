const {Product} = require('../db')

async function verifyingDuplicateProduct(req,res,next){
    let product = req.body
    console.log('title is ',product.title)
    console.log('sellername is ',product.sellername)
    let existingProduct = await Product.findOne({$and:[{title:product.title},{sellername:product.sellername}]})
    console.log("Existing Product ",existingProduct)
    if(existingProduct===null){
        next()
    }else{
        res.status(200).send({message:"product already exists please update the existing product"})
    }
}

module.exports = verifyingDuplicateProduct