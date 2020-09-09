const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

 router.get('/', auth, userCtrl.getOneUser);
 router.get('/users',admin, userCtrl.getAllUsers);
 router.post('/signup',  userCtrl.signup);
 router.post('/login', userCtrl.login);
 router.delete('/:id',auth, userCtrl.deleteOneUser);
 router.put('/:id', auth, userCtrl.updateOneUser )

module.exports = router;