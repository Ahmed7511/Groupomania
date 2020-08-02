const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/Message');
const auth = require('../middleware/Auth');
const multer = require('../middleware/multer-config');

 router.post('/message', auth, multer, userCtrl.createMessage);
 router.get('/messages', auth, userCtrl.getAllMessage);
 router.delete('/messages/:id', auth, userCtrl.deleteMessage);
 router.get('/messages/:id', auth, userCtrl.getOneMessage);
 router.put('/messages/:id', auth, multer, userCtrl.updateOneMessage);


 module.exports = router;