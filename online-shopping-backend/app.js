const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const authMiddleware = require('./middleware/authJwt');
const config = require('./util/config');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(authMiddleware.verifyToken);
app.use(userRoutes);
app.use(productRoutes);

mongoose.connect(config.dbUrl + config.dbName, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(config.port, () => {
            console.log('Running on ' + config.port);
        });
    }).catch(err => console.error(err));