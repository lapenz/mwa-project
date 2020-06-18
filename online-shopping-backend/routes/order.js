const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const authorize = require('../middleware/authorize');
const Role = require('../models/user').Roles;

router.get('/', authorize([Role.BUYER, Role.SELLER]), getOrder);
router.get('/getByUser', authorize([Role.BUYER, Role.SELLER]), getByUser);
router.post('/', authorize(Role.BUYER), postOrder);

 function getOrder (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    const cart = req.session.cart;

    res.status(200).json(cart);
}

function getByUser(req, res, next) {
    Order.find({buyer: req.user.userId}, function (err, orders) {
        if(err) res.sendStatus(404);
        res.status(200).json(orders);
    });
}

function postOrder(req, res, next) {
    // if (!req.session.cart) {
    //     return res.redirect('/cart');
    // }
    //const cart = req.session.cart;
    let orders =  [];
    orders = req.body;

    Order.insertMany(orders, function (err, result) {
        req.session.cart = null;
        if (err) {
            return res.status(400).json({message: 'Saving error'});
            console.log(err);
          }else{
            console.log(result);
          }
          
          return res.status(201).json({message: 'Created'});
    });
}

module.exports = router;