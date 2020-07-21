const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/Message');
const auth = require('../middleware/Auth');

 router.post('/message', auth, userCtrl.createMessage);
 router.get('/messages', auth, userCtrl.getAllMessage);
 router.delete('/messages/:id', auth, userCtrl.deleteMessage);
 router.get('/messages/:id', auth, userCtrl.getOneMessage);
 router.put('/messages/:id', auth, userCtrl.updateOneMessage);


 module.exports = router;