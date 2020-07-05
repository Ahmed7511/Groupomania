const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User');

 router.get('/', userCtrl.getAllUsers);
 router.post('/signup',  userCtrl.signup);
 router.post('/login', userCtrl.login);
 //router.delete('/:id', userCtrl.deleteOneUser);

module.exports = router;