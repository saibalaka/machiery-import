const exp = require('express')
const sellerApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const {creatNewseller} = require('../controller/seller-controller')

//handling requesrts by sending them to controller

sellerApp.post('/seller',expressAsyncHandler(creatNewseller))



module.exports = sellerApp