const multer = require('multer')
const path = require('path')
const fs = require('fs')

const {media} = require('../models')

// add media
const addMedia = async (req, res) => {
try{
    const image = req.uploadName

    if(image === null){
        return res.status(400).send({
            message : 'file not found'
        })
    }

    await media.create({file:image})
        return res.status(200).send({
            message: 'Add image success'
        })
    } 
    catch(err){
        return res.status(500).send({
            'message': err.message
        })
    }
}

// get all media
const getAllMedia = async (req, res) => {

    const images = await media.findAll({})
    res.status(200).send(images)
}

// get media byID

const getMediaByID = async (req, res) => {
    try {
        const response = await media.findOne({
            where : {
                id : req.params.id
            }
        });
        res.json(response)
    } catch (error){
        res.status(500).send(error)
    }  
}

// update media

const updateMedia = async (req, res) => {
    
    const files = req.uploadName
    const image = await media.findOne({
        where:{
            id : req.params.id
        }
    });
    try{
        // const files = req.file
        if (image === null){
            return res.status(404).send({
                message : 'image not found'})
        }

        const imagePath = path.join(process.cwd(),'images', image.file) 
        fs.unlinkSync(imagePath);
        
        await image.update({file: files},)
            return res.status(200).send({
                message : "update image success"
        })
    }catch (error){
        return res.status(500).send({
            "message" : error.message
        })
    }  
}

// delete media

const deleteMedia = async (req, res) => {
    const image = await media.findOne({
        where:{
            id : req.params.id
        }});
    try {
        if (!image){
            return res.status(404).send({
                message : 'image not found'})
        }
        const imagePath = path.join(process.cwd(),'images', image.file) 
        fs.unlinkSync(imagePath);
        await media.destroy({
            where:{
                id : req.params.id
            }
        });
        return res.status(200).send ({
            message : "deleted successfully"})
    } catch (error){
        return res.status(500).send(error)
    }
}

// upload Media

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        req.uploadName = Date.now() + path.extname(file.originalname) 
        cb(null,req.uploadName )
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


module.exports = {
    updateMedia,
    deleteMedia,
    upload,
    addMedia,
    getAllMedia,
    getMediaByID
}