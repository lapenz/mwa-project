const Order = require('../models/order');

router.get('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    const cart = req.session.cart;

    res.status(200).json(cart);
});

router.post('/checkout', function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    const cart = req.session.cart;

    const order = new Order({
        buyer: req.userId,
        cart: cart,
        purchaseDate: new Date(),
        totalPrice: cart.totals,
        billingAddress: req.body.address,
        shippingAddress: req.body.name,
        // payment: charge.id
    });
    order.save(function (err, result) {
        req.session.cart = null;
        res.sendStatus(201);
    });

});