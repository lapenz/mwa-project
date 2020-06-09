const express = require('express');
const router = express.Router();

const userController = require('../controller/UsersController');

router.get('/users', userController.list);
router.post('/users', userController.insert);

router.get('/users/aggregate', userController.getNoOfUsersInRole);

router.get('/users/:userId', userController.getById);
router.put('/users/:userId', userController.patchById);
router.delete('/users/:userId', userController.removeById);


module.exports = router;