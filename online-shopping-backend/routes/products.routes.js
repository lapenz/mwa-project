const express = require('express');
const router = express.Router();

const productsController = require('../controller/ProductsController');

router.get('/products', productsController.findAll);
router.post('/products', productsController.register);

router.get('/products/:id', productsController.findById);
router.put('/products/:id', productsController.update);
router.delete('/products/:id', productsController.delete);


module.exports = router;