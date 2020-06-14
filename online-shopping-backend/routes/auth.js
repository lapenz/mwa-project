const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../util/config');
const User = require('../models/user');

const ApiResponse = require('../models/api.response');

const router = express.Router();

router.post('/signin', async(req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const isValid = await bcrypt.compare(req.body.password, user.password);
            if (isValid) {
                const token = jwt.sign({ userId: user.id }, config.jwtKey, {
                    expiresIn: config.expiresIn
                });
                res.status(200).send(new ApiResponse(200, 'success', { token: token, auth: true }));
            } else {
                res.status(401).send(new ApiResponse(401, 'error', { err: 'username or password not exist' }));
            }

        } else {
            res.status(401).send(new ApiResponse(401, 'error', { err: 'username or password not exist' }));
        }
    } catch (err) {
        res.status(500).send(new ApiResponse(500, 'error', err));
    }
});

router.get('/signout', async(req, res, next) => {
    res.status(200).send({ auth: false, token: null });
});

router.post('/signup', async(req, res, next) => {
    const pass = req.body.password;
    User.addUser(req.body)
        .then(result => {
            const signinReqBody = {username: result.username, password: pass};
            req.body = signinReqBody;
            this.signin(req, res, next);
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
});


module.exports = router;