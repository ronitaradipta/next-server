const multer = require('multer');
const path = require('path');
const cloudinary = require('../../utils/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images',
    format: async (req, file) => 'webp',
    public_id: (req, file) => {
      const now = Date.now();

      return now;
    },
    transformation: [{ width: 350, height: 500, crop: 'limit' }],
  },
});

module.exports = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Give proper files formate to upload');
  },
});
