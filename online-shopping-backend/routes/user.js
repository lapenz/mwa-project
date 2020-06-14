const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ApiResponse = require('../models/api.response');

router.get('/', (req, res, next) => {
    User.find()
        .then(users => {
            res.status(200).send(new ApiResponse(200, 'success', users));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
});

router.post('/', (req, res, next) => {
    if(User.isValidAddUser(req.body)){
        User.addUser(req.body)
            .then(result => {
                res.status(201).send(new ApiResponse(201, 'success', result));
            })
            .catch(err => {
                res.status(500).send(new ApiResponse(500, 'error', err));
            });
    }
    else{
        res.status(409).send(new ApiResponse(409, 'Duplicate', "User Name already exists!"));
    }

});

router.put('/approveUser/:id', (req, res, next) => {
    User.findByIdAndUpdate({_id: req.params.userId}, {isApprovedUser: req.body.ApprovedUser})
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        });
});

router.get('/aggregate', (req, res, next) => {
    User.aggregate([
        { $group: { _id: "$role", sum_users: { $sum: 1 } } }
    ])
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
});

router.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
});

router.put('/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => {
            const hashedPassword = bcrypt.hashSync(req.body.password, 8);

            user.password = hashedPassword;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.birthDate = req.body.birthDate;
            user.role = req.body.role;

            return user.save();
        })
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        });
});

router.delete('/:userId', (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
});


module.exports = router;