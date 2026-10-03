const Product = require('../model/product');

const get_products = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
};

const get_product_by_id = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch product',
      error: error.message,
    });
  }
};

const create_product = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      image,
      stock,
    } = req.body;

    if (
      !name ||
      price === undefined ||
      !category ||
      !image ||
      stock === undefined
    ) {
      return res.status(400).json({
        message:
          'Name, price, category, image and stock are required',
      });
    }

    const product = await Product.create({
      name,
      price,
      category,
      image,
      stock,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create product',
      error: error.message,
    });
  }
};

module.exports = {
  get_products,
  get_product_by_id,
  create_product,
};