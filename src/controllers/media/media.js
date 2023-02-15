const path = require('path');
const fs = require('fs');

const { media } = require('../../models');

// add media
const addMedia = async (req, res) => {
  try {
    const image = `${req.protocol}://${req.get('host')}/${req.formatWebp}`;

    if (image === null) {
      return res.status(400).send({
        message: 'file not found',
      });
    }
    await media.create({ file: image });
    
    return res.status(200).send({
      message: 'image upload succesfully',
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: err.message,
    });
  }
};


// get all media
const getAllMedia = async (req, res) => {
  try {
    const images = await media.findAll();
    return res.status(200).send({ message: 'success', data: images });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// get media byID

const getMediaByID = async (req, res) => {
  try {
    const response = await media.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

// update media

const updateMedia = async (req, res) => {
  const files = req.formatWebp;
  const image = await media.findOne({
    where: {
      id: req.params.id,
    },
  });
  try {
    // const files = req.file
    if (image === null) {
      return res.status(404).send({
        message: 'image not found',
      });
    }

    const imagePath = path.join(process.cwd(), 'images', image.file);
    fs.unlinkSync(imagePath);

    await image.update({ file: files });
    return res.status(200).send({
      message: 'update image success',
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

// delete media

const deleteMedia = async (req, res) => {
  const image = await media.findOne({
    where: {
      id: req.params.id,
    },
  });
  try {
    if (!image) {
      return res.status(404).send({
        message: 'image not found',
      });
    }
    const imagePath = path.join(process.cwd(), 'images', image.file);
    fs.unlinkSync(imagePath);
    await media.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send({
      message: 'deleted successfully',
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  updateMedia,
  deleteMedia,
  addMedia,
  getAllMedia,
  getMediaByID,
};
