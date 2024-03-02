const exp = require('express')
const buyerApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const {creatNewBuyer} = require('../controller/buyer-controller')

//handling requesrts by sending them to controller

buyerApp.post('/buyer',expressAsyncHandler(creatNewBuyer))



module.exports = buyerApp