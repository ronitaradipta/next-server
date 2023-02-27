const { Store } = require('../../models');

module.exports = async (req, res) => {
  try {
    const storeId = req.user.storeId;
    const store = await Store.findByPk(storeId);

    return res.status(200).send({
      message: 'success',
      data: store,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
