const { Importer } = require('../db')

//creat new importer
const creatNewimporter = async(req,res)=>{
    let existingImporter = await Importer.findOne({name:req.body.name})

    if(existingImporter === null){
        let doc = await Importer.create(req.body)
        res.status(200).send({message:"Importer data added",payload:doc})
    }else{
        res.status(200).send({message:"Importer details already exists"})
    }
}

//get importer by name
const getImporterByName = async(req,res)=>{
    let importer = await Importer.findOne({name:req.params.name})
    if(importer !== null){
        res.status(200).send({message:"got the user ",payload:importer})
    }else{
        res.status(200).send({message:"Importer does not exist"})
    }
}

//get importer by id
const getImporterById = async(req,res)=>{
    let importer = await Importer.findById(req.params.id)
    res.status(200).send({message:"Importer details",payload:importer})
}


module.exports = {creatNewimporter,getImporterByName,getImporterById}