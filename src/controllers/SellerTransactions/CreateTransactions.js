const { SellerTransactions, Store, sequelize } = require('../../models');

module.exports = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const storeId = req.user.storeId;
    const { amount, bankAccount } = req.body;

    const store = await Store.findByPk(storeId);

    if (!store) {
      return res.status(404).send({ error: 'store not found' });
    }

    if (store.nextCoinBalance < amount) {
      return res.status(400).send({ error: 'Insufficient NextCoin Balance' });
    }

    const withdrawData = await SellerTransactions.create(
      {
        storeId,
        amount,
        bankAccount,
      },
      {
        transaction: t,
      }
    );

    await store.decrement({ nextCoinBalance: amount }, { transaction: t });

    await t.commit();

    return res.status(201).send({
      message: 'successfully created',
      data: withdrawData,
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).send(error.message);
  }
};
