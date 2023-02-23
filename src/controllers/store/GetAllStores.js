const { Store, User } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const dataPerPage = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;

    const store = await Store.findAndCountAll({
      attributes: [
        'id',
        'name',
        'description',
        'image',
        'city',
        'status',
        'nextCoinBalance',
        'userId',
      ],
      include: [{ model: User, attributes: ['name', 'email'] }],
      distinct: true,
    });

    // calculate total page needed
    const totalPages = Math.ceil(store.count / dataPerPage);

    return res.status(200).send({
      message: 'success',
      data: store.rows,
      totalData: store.count,
      currentPage,
      dataPerPage,
      totalPages,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
