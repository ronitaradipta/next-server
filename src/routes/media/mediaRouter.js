const express = require('express');
const mediaControler = require('../../controllers/media/media')
// const multer = require('multer')
const path = require('path')


const router = express.Router();

router.post('/upload', mediaControler.upload, mediaControler.addMedia)
router.get('/',mediaControler.getAllMedia)
router.delete('/:id', mediaControler.deleteMedia)
router.get('/:id', mediaControler.getMediaByID)
router.put('/:id',mediaControler.upload, mediaControler.updateMedia)

module.exports = router