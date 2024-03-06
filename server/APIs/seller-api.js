const exp = require('express')
const sellerApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const {creatNewSeller,sellerLogin,sellerRequests,sellerDetails,updateRequest,deleteRequest,updateStatus,sellerDetailsById} = require('../controller/seller-controller')

//handling requesrts by sending them to controller

//handler to create new user
sellerApp.post('/seller',expressAsyncHandler(creatNewSeller))

//handler to user login
sellerApp.post('/seller-login',expressAsyncHandler(sellerLogin))

//req handler for getting seller requests
sellerApp.get('/seller-requests/:username',expressAsyncHandler(sellerRequests))

//req handler for getting seller details
sellerApp.get('/seller/:username',expressAsyncHandler(sellerDetails))

//req handler for getting seller details by id
sellerApp.get('/seller-id/:id',expressAsyncHandler(sellerDetailsById))

//req handler for updating seller requests
sellerApp.put('/seller-requests',expressAsyncHandler(updateRequest))

//req handler for deleteing seller request
sellerApp.put('/seller-delete-req',expressAsyncHandler(deleteRequest))

//req handler for updating seller requests status
sellerApp.put('/seller-status',expressAsyncHandler(updateStatus))


module.exports = sellerApp