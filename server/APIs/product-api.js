const exp = require('express')
const productApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const { getProducts,
        getProductsBySellername,
        createProduct,
        updateProduct,
        removeProduct} = require('../controller/product-controller')
const verifyingDuplicateProduct = require('../middlewares/verifyingDuplicateProduct')
require('dotenv').config()
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const cloudinaryStorage = require('cloudinary-multer')
//config
cloudinary.config({
    cloud_name :process.env.CLOUD_NAME,
    api_key	:process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

//cloud strorage config
const storage = cloudinaryStorage({
    cloudinary:cloudinary
})

const upload = multer({storage:storage})

//transprer the req to req handler controller

//to get all the products
productApp.get('/products',expressAsyncHandler(getProducts))

//to get the products by seller name
productApp.get('/products/:sellername',expressAsyncHandler(getProductsBySellername))

//to create new product
productApp.post('/product',upload.single('image'),expressAsyncHandler(createProduct))

//to update the product
productApp.put('/product',upload.single('image'),expressAsyncHandler(updateProduct))

//to remove the product
productApp.delete('/product/:id',expressAsyncHandler(removeProduct))


module.exports = productApp