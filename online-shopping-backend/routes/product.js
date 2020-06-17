const express = require('express');
const ApiResponse = require('../models/api.response');
const Product = require('../models/product');
const authorize = require('../middleware/authorize');
const Role = require('../models/user').Roles;
const router = express.Router();

router.get('/', getAll);
router.get('/seller', authorize(Role.SELLER), getBySeller);
router.get('/reviews', authorize(Role.ADMIN), getAllReviews);
router.post('/', authorize(Role.SELLER), save);
router.get('/:id', getById);
router.put('/approve-review', authorize(Role.ADMIN), approveReview);
router.put('/:id',authorize(Role.SELLER), update);

router.delete('/:id', authorize(Role.SELLER), deleteById);



function getAllReviews(req, res, next) {
    Product.find({$and:[{'reviews.approved': 0},{'reviews.buyer': { $exists: true}}]},
                 {title: 1, 'reviews.description': 1, 'reviews.rating': 1, 'reviews.buyer': 1, 'reviews.approved': 1})
        .then(users => {
            res.status(200).send(new ApiResponse(200, 'success', users));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

function approveReview(req, res, next) {
    Product.updateOne(
        {_id: req.body.prodctId, 'reviews.buyer': req.body.userId}, 
        {$set:{'reviews.$.approved': 1}})
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

function getAll(req, res, next) {    
    Product.find({}, function (err, products) {
        if(err) res.sendStatus(404);
        res.status(200).json(products);
    }).populate("seller");
}

function getBySeller(req, res, next) {
    Product.find({seller: req.userId}, function (err, products) {
        if(err) res.sendStatus(404);
        res.status(200).json(products);
    });
}

function save(req, res, next) {
    let product = new Product(req.body);
    product.seller = req.userId;

    product.save( function (err) {
        if (err) res.status(500).json('Saving error');
        res.sendStatus(201)
    });
}

function getById(req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if(err) res.sendStatus(404);
        if(!product) res.sendStatus(404);
        res.status(200).json(product);
    });
}

function update(req, res, next) {
    Product.updateOne({_id: req.params.id}, req.body, function (err) {
        if(err) res.status(500).json(err);
        res.sendStatus(204);
    });
}

function deleteById(req, res, next) {
    Product.deleteOne({_id: req.params.id}, function (err) {
        if(err) res.sendStatus(404);
        res.status(204).json();
    });
}


module.exports = router;
