const express = require('express');
const Product = require('../models/product');
const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find({}, function (err, products) {
        if(err) res.sendStatus(404);
        res.status(200).json(products);
    }).populate("seller");
});

router.get('/seller', (req, res, next) => {
    Product.find({seller: req.userId}, function (err, products) {
        if(err) res.sendStatus(404);
        res.status(200).json(products);
    }).populate("seller");
});

router.post('/', (req, res, next) => {
    let product = new Product(req.body);
    product.seller = req.userId;

    product.save( function (err) {
        if (err) res.status(500).json('Saving error');
        res.sendStatus(201)
    });
});

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id, function (err, product) {
        if(err) res.sendStatus(404);
        if(!product) res.sendStatus(404);
        res.status(200).json(product);
    });
});

router.put('/:id', (req, res, next) => {
    Product.updateOne({_id: req.params.id}, req.body, function (err) {
        if(err) res.status(500).json(err);
        res.sendStatus(204);
    });
});

router.delete('/:id', (req, res, next) => {
    Product.deleteOne({_id: req.params.id}, function (err) {
        if(err) res.sendStatus(404);
        res.status(204).json();
    })
});


module.exports = router;