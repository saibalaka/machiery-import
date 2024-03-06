const exp = require('express')
const importerApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const {creatNewimporter,getImporterByName,getImporterById} = require('../controller/importer-controller')

//handling requesrts by sending them to controller

importerApp.post('/importer',expressAsyncHandler(creatNewimporter))

importerApp.get('/importer/:name',expressAsyncHandler(getImporterByName))

importerApp.get('/importer-id/:id',expressAsyncHandler(getImporterById))



module.exports = importerApp