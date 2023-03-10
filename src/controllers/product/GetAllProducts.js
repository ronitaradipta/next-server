const { Op } = require('sequelize');
const {
  Product,
  Store,
  ProductCategory,
  ProductGalleries,
} = require('../../models');

module.exports = async (req, res) => {
  try {
    const {
      limit,
      page,
      search,
      category,
      minPrice,
      maxPrice,
      city,
      minReview,
      minRating,
    } = req.query;
    const dataPerPage = parseInt(limit) || 10;
    const currentPage = parseInt(page) || 1;

    // check if there are any queries
    const query = {};
    if (search) {
      query[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    if (category) {
      const findCategory = await ProductCategory.findOne({
        where: { slug: category },
      });
      if (findCategory) {
        query.categoryId = findCategory.id;
      } else {
        return res.status(404).send({ message: 'Categories not found' });
      }
    }
    if (city) {
      const findCity = await Store.findOne({
        where: { city: city },
      });
      if (findCity) {
        query.storeId = findCity.id;
      } else {
        return res
          .status(404)
          .send({ message: 'product with the requested city is not found' });
      }
    }
    if (minPrice && maxPrice) {
      query.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    } else if (minPrice) {
      query.price = {
        [Op.gte]: minPrice,
      };
    } else if (maxPrice) {
      query.price = {
        [Op.lte]: maxPrice,
      };
    }
    if (minReview) {
      query.totalReview = {
        [Op.gte]: minReview,
      };
    }
    if (minRating) {
      query.averageRatings = { [Op.gte]: minRating };
    }

    const product = await Product.findAndCountAll({
      where: query,
      limit: dataPerPage,
      offset: (currentPage - 1) * dataPerPage,
      attributes: [
        'id',
        'name',
        'description',
        'price',
        'stock',
        'averageRatings',
        'totalReview',
      ],
      include: [
        {
          model: Store,
          as: 'store',
          attributes: ['name', 'city'],
        },
        {
          model: ProductCategory,
          as: 'category',
          attributes: ['name', 'image', 'slug'],
        },
        {
          model: ProductGalleries,
          attributes: ['image'],
        },
      ],
      distinct: true,
    });

    if (product.count === 0) {
      return res.status(404).send({ message: 'Products not found' });
    }
    // calculate total page needed
    const totalPages = Math.ceil(product.count / dataPerPage);

    const data = product.rows.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        averageRatings: item.averageRatings,
        totalReview: item.totalReview,
        storeName: item.store.name,
        storeCity: item.store.city,
        storeImage: item.store.image,
        categoryName: item.category.name,
        categoryImage: item.category.image,
        images: item.ProductGalleries,
      };
    });

    return res.status(200).send({
      message: 'success',
      data: data,
      totalProducts: product.count,
      currentPage,
      dataPerPage,
      totalPages,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
