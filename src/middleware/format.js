const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = (req, res, next) => {
  const imagePath = path.join(process.cwd(), 'images', req.uploadName);
  // console.log(imagePath)
  const formatWebp = path.join(process.cwd(), 'images', req.formatWebp);
  sharp(imagePath)
    .webp()
    .toFile(formatWebp, (err, info) => {
      if (err) next(err);
      else {
        next(null, true);
        fs.unlinkSync(imagePath);
      }
    });
};
