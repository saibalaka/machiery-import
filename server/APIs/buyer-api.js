const exp = require('express')
const buyerApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const {creatNewBuyer,buyerLogin,buyerRequests,buyerDetails,updateRequest,deleteRequest,updateStatus,buyerDetailsById} = require('../controller/buyer-controller')

//handling requesrts by sending them to controller

//handler to create new user
buyerApp.post('/buyer',expressAsyncHandler(creatNewBuyer))

//handler to user login
buyerApp.post('/buyer-login',expressAsyncHandler(buyerLogin))

//req handler for getting buyer requests
buyerApp.get('/buyer-requests/:username',expressAsyncHandler(buyerRequests))

//req handler for getting buyer details
buyerApp.get('/buyer/:username',expressAsyncHandler(buyerDetails))

//req handler for getting buyer details by id
buyerApp.get('/buyer-id/:id',expressAsyncHandler(buyerDetailsById))

//req handler for updating buyer requests
buyerApp.put('/buyer-requests',expressAsyncHandler(updateRequest))

//req handler for deleteing buyer request
buyerApp.put('/buyer-delete-req',expressAsyncHandler(deleteRequest))

//req handler for updating buyer requests status
buyerApp.put('/buyer-status',expressAsyncHandler(updateStatus))

module.exports = buyerApp