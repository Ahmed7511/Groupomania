const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/image');
const auth = require('../middleware/Auth');

 router.post('/images', userCtrl.createImage);
//  router.get('/messages', auth, userCtrl.getAllMessage);
//  router.delete('/messages/:id', auth, userCtrl.deleteMessage);
//  router.get('/messages/:id', auth, userCtrl.getOneMessage);
//  router.put('/messages/:id', auth, multer, userCtrl.updateOneMessage);


 module.exports = router;