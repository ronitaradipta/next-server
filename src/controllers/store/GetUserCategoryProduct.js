const { ProductCategory, Product, Store } = require('../../models');

module.exports = async (req, res) => {
  try {
    // Find the store associated with the logged-in user
    const store = await Store.findOne({ where: { userId: req.user.userId } });

    // get category id from all products that are associated with the store
    const categories = await Product.findAll({
      where: {
        storeId: store.id,
      },
      attributes: ['categoryId'],
      group: ['categoryId'],
    });

    // Extract the unique category IDs from the products
    const categoryIds = categories.map((category) => category.categoryId);

    // Find the category names based on the category IDs
    const categoryNames = await ProductCategory.findAll({
      where: {
        id: categoryIds,
      },
      attributes: ['name', 'slug'],
    });

    return res.status(200).send({
      message: 'success',
      categories: categoryNames,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
