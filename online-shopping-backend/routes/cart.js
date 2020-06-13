var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

router.get('/add-to-cart/:id', function (req, res, next) {
    Product.findById(req.params.id)
        .then(product => {
            Cart.addToCart(product);
            Cart.saveCart(req);
            res.status(204).json();
        })
        .catch(err => console.log(err));
});

router.get('/shopping-cart', function (req, res, next) {
    var cart = req.session.cart;

    if (!cart) {
        return res.status(200).json();
    }

    res.status(200).json(cart);
});

router.get('/empty-cart', function (req, res, next) {
    Cart.emptyCart(req);
    res.status(204).json();
})

module.exports = router;