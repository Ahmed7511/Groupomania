const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/Like');
const auth = require('../middleware/auth');

router.post('/', userCtrl.reactPost);
//router.get('/:id', userCtrl.getAllReact);
router.get('/like/:id', userCtrl.getAllLike);
router.get('/dislike/:id', userCtrl.getAllDisLike);



module.exports = router;

