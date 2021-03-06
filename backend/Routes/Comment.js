const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/Comment');
const auth = require('../middleware/auth');

router.post('/comments',auth, userCtrl.createComment);
router.get('/comments/:id',auth, userCtrl.getOneComment);
router.get('/comments',auth, userCtrl.getAllComments);
router.put('/comments/:id',auth, userCtrl.updateOneComment);
router.delete('/comments/:id',auth, userCtrl.deleteComment);


module.exports = router;