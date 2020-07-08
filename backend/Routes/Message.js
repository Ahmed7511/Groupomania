const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/Message');

 router.post('Groupomania/message', userCtrl.getMessage);
 router.get('Groupomania/message', userCtrl.getAllMessage);


 module.exports = router;