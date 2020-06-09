const Product = require('../models/product');

exports.register = (req, res, next) => {

    Product.create(req.body, function (err) {
        if (err) res.json(500, 'Saving error');
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
    });
}

exports.delete = (req, res, next) => {
    Product.deleteOne({_id: req.params.id}, function (err) {
        if(err) res.status(404);
        res.status(204).json();
    })
};
