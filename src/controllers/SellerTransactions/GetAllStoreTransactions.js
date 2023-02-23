const { Store, SellerTransactions } = require('../../models');

module.exports = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const dataPerPage = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;

    const transactions = await SellerTransactions.findAndCountAll({
      limit: dataPerPage,
      offset: (currentPage - 1) * dataPerPage,
      attributes: ['id', 'storeId', 'amount', 'bankAccount', 'status'],
      include: [
        { model: Store, as: 'store', attributes: ['name', 'nextCoinBalance'] },
      ],
      distinct: true,
    });

    // calculate total page needed
    const totalPages = Math.ceil(transactions.count / dataPerPage);

    return res.status(200).send({
      message: 'success',
      data: transactions.rows,
      totalData: transactions.count,
      currentPage,
      dataPerPage,
      totalPages,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
