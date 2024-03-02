//import express
const exp = require('express')
const app = exp()
const path = require('path')

app.use(exp.static(path.join(__dirname,'../client/dist/client/browser')))

//configure environment variables
require('dotenv').config()
app.use(exp.json())


//import apis
const buyerApp = require('./APIs/buyer-api')
const sellerApp = require('./APIs/seller-api')
const importerApp = require('./APIs/importer-api')

//forward req to that particular api
app.use('/buyer-api',buyerApp)
app.use('/seller-api',sellerApp)
app.use('/importer-api',importerApp)

//to load the front end url
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/dist/client/browser/index.html'))
})


//error handller middeleware
function errHandllerMiddleware(err,req,res,next){
    res.send({message:"error occured",payload:err.message})
}

app.use(errHandllerMiddleware)

//assign port value
PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`web server listening on port ${PORT}`)
})