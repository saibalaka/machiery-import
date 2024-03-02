const exp = require('express')
const buyerApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const {creatNewBuyer,buyerLogin} = require('../controller/buyer-controller')

//handling requesrts by sending them to controller

//handler to create new user
buyerApp.post('/buyer',expressAsyncHandler(creatNewBuyer))

//handler to user login
buyerApp.post('/buyer-login',expressAsyncHandler(buyerLogin))


module.exports = buyerApp