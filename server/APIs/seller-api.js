const exp = require('express')
const sellerApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const {creatNewSeller,sellerLogin} = require('../controller/seller-controller')

//handling requesrts by sending them to controller

//handler to create new user
sellerApp.post('/seller',expressAsyncHandler(creatNewSeller))

//handler to user login
sellerApp.post('/seller-login',expressAsyncHandler(sellerLogin))


module.exports = sellerApp