const fs = require('fs');
const path = require('path');

module.exports = (imagePath, data) => {
  const fileName = data.split('/').pop();
  const filePath = path.join(process.cwd(), imagePath, fileName);
  fs.unlink(filePath, (error) => {
    if (error) {
      console.error(error);
      return;
    }
  });
};
