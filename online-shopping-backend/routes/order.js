const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const authorize = require('../middleware/authorize');
const Role = require('../models/user').Roles;

router.get('/', authorize([Role.BUYER, Role.SELLER]), getOrder);
router.post('/', authorize(Role.BUYER), postOrder);

 function getOrder (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    const cart = req.session.cart;

    res.status(200).json(cart);
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
            console.log(err);
          };
          console.log(result);
    });
}

module.exports = router;