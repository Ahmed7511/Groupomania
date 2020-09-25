const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/admin');
const admin = require('../middleware/admin');

router.get('/messages/', admin, userCtrl.getAllMessageAdmin);
router.get('/users/', admin, userCtrl.getAllUsersAdmin);




module.exports = router;
