const {
  Product,
  Store,
  ProductCategory,
  ProductGalleries,
} = require('../../models');
const { Op } = require('sequelize');

module.exports = async (req, res) => {
  try {
    if (req.user.userRole !== 'Seller') {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const { limit = 5, page = 1, search, category, sortBy } = req.query;
    const dataPerPage = parseInt(limit);
    const currentPage = parseInt(page);
    const offset = (currentPage - 1) * dataPerPage;
    const order = [['createdAt', 'DESC']];
    const query = {};

    if (search) {
      query.name = { [Op.like]: `%${search}%` };
    }

    if (category) {
      const findCategory = await ProductCategory.findOne({
        where: { slug: category },
      });
      if (!findCategory) {
        return res.status(404).send({ message: 'Category not found' });
      }
      query.categoryId = findCategory.id;
    }

    const store = await Store.findOne({ where: { userId: req.user.userId } });

    const product = await Product.findAndCountAll({
      where: {
        ...query,
        storeId: store.id,
      },
      limit: dataPerPage,
      offset: offset,
      attributes: [
        'id',
        'name',
        'description',
        'price',
        'stock',
        'averageRatings',
        'totalReview',
        'createdAt',
      ],
      include: [
        {
          model: ProductCategory,
          as: 'category',
          attributes: ['id', 'name', 'slug'],
        },
        {
          model: ProductGalleries,
          attributes: ['image'],
        },
      ],
      order: sortBy
        ? [
            sortBy.startsWith('price:') && [
              'price',
              sortBy.endsWith('asc') ? 'ASC' : 'DESC',
            ],
            sortBy.startsWith('stock:') && [
              'stock',
              sortBy.endsWith('asc') ? 'ASC' : 'DESC',
            ],
            sortBy.startsWith('createdAt:') && [
              'createdAt',
              sortBy.endsWith('asc') ? 'ASC' : 'DESC',
            ],
          ].filter(Boolean)
        : order,
      distinct: true,
    });

    if (product.count === 0) {
      return res
        .status(404)
        .send({ message: 'No product with entered keywords were found' });
    }

    const totalPages = Math.ceil(product.count / dataPerPage);

    const data = product.rows.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
      date: item.createdAt,
      averageRatings: item.averageRatings,
      totalReview: item.totalReview,
      categoryName: item.category.name,
      categoryId: item.category.id,
      images: item.ProductGalleries,
    }));

    return res.status(200).send({
      message: 'success',
      data: data,
      totalProducts: product.count,
      currentPage,
      dataPerPage,
      totalPages,
      offset,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
