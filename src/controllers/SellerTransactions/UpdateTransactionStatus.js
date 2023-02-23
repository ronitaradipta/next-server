const { SellerTransactions, Store, sequelize } = require('../../models');

module.exports = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const transactionId = req.params.id;
    const { status } = req.body;
    const transaction = await SellerTransactions.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).send({ error: 'Transaction not found' });
    }

    await transaction.update(
      {
        status,
      },
      { transaction: t }
    );

    if (transaction.status === 'failed') {
      const store = await Store.findByPk(transaction.storeId);

      await store.increment(
        { nextCoinBalance: transaction.amount },
        { transaction: t }
      );
    }

    await t.commit();

    return res.status(200).send({
      message: 'updated successfully',
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).send(error.message);
  }
};
