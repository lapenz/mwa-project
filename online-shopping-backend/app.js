const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const authMiddleware = require('./middleware/authJwt');
const config = require('./util/config');
const cartRoutes = require('./routes/cart');

const app = express();

mongoose.connect(config.dbUrl + config.dbName, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(config.port, () => {
            console.log('Running on ' + config.port);
        });
    }).catch(err => console.error(err));

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(function(req, res, next) {
    req.session.cookie.maxAge = 180 * 60 * 1000; // 3 hours
    next();
});
app.use(authRoutes);
app.use(authMiddleware.verifyToken);
app.use('/users/', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

