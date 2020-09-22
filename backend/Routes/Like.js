const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/Like');
const auth = require('../middleware/auth');

router.post('/',auth, userCtrl.reactPost);
//router.get('/', userCtrl.getReact);
//router.get('/like/:messageId',auth, userCtrl.getAllLike);
//router.get('/dislike/:messageId',auth, userCtrl.getAllDisLike);



module.exports = router;

