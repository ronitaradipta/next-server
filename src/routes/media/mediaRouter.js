const express = require('express');
const mediaControler = require('../../controllers/media/media');
const format = require('../../middleware/format')

const upload = require('../../middleware/upload');

const router = express.Router();

router.post('/upload', upload.single('file'),format, mediaControler.addMedia);
router.get('/', mediaControler.getAllMedia);
router.delete('/:id', mediaControler.deleteMedia);
router.get('/:id', mediaControler.getMediaByID);
router.put('/:id', upload.single('file'),format, mediaControler.updateMedia);

module.exports = router;
