const { Address } = require('../../models');

module.exports = async (req, res) => {
  try {
    const formerMainAddress = await Address.findOne({
      where: { userId: req.user.userId, isMain: true },
    });

    if (!formerMainAddress) {
      return res.status(400).json({ message: 'Address not found' });
    }

    await formerMainAddress.update({ isMain: false });

    const newMainAddress = await Address.findOne({
      where: { id: req.params.id, userId: req.user.userId },
    });

    if (!newMainAddress) {
      return res.status(400).json({ message: 'Address not found' });
    }

    await newMainAddress.update({ isMain: true });

    res.status(200).json({ message: 'Main address updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
