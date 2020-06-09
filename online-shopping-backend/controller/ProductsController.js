const Product = require('../models/product');
const User = require('../models/user');

exports.register = (req, res, next) => {
    let product = new Product(req.body);
    product.seller = req.userId;

    product.save( function (err) {
        if (err) res.status(500).json('Saving error');
        res.status(201).json();
    });

};

exports.findById = (req, res, next) => {
    Product.findById(req.params.id, function (err, product) {
        if(err) res.json(404);
        res.status(200).json(product);
    });
};

exports.update = (req, res, next) => {

    Product.updateOne({_id: req.params.id}, req.body, function (err) {
        if(err) res.status(500).json(err);
        res.status(204).json();
    });

};

exports.findAll = (req, res, next) => {
    Product.find({}, function (err, products) {
        if(err) res.status(404);
        res.status(200).json(products);
    }).populate("seller");
}

exports.findAllFromSeller = (req, res, next) => {
    Product.find({seller: req.userId}, function (err, products) {
        if(err) res.status(404);
        res.status(200).json(products);
    }).populate("seller");
}

exports.delete = (req, res, next) => {
    Product.deleteOne({_id: req.params.id}, function (err) {
        if(err) res.status(404);
        res.status(204).json();
    })
};
