const express = require('express');
const mediaControler = require('../../controllers/media/media');
// change this :
// const format = require('../../middleware/format');
// const upload = require('../../middleware/upload');

// and replace with :
const { FileUpload, FileResize } = require('../../middleware/Media');
const router = express.Router();

router.post('/upload', FileUpload.single('file'), mediaControler.addMedia);
router.get('/', mediaControler.getAllMedia);
router.delete('/:id', mediaControler.deleteMedia);
router.get('/:id', mediaControler.getMediaByID);
router.put('/:id', FileUpload.single('file'), mediaControler.updateMedia);

module.exports = router;
