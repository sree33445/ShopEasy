const express = require('express');

const {
  get_products,
  get_product_by_id,
  create_product,
} = require('../controller/productController');

const router = express.Router();

router.get('/', get_products);

router.get('/:id', get_product_by_id);

router.post('/', create_product);

module.exports = router;