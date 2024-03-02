const exp = require('express')
const importerApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const {creatNewimporter} = require('../controller/importer-controller')

//handling requesrts by sending them to controller

importerApp.post('/importer',expressAsyncHandler(creatNewimporter))



module.exports = importerApp