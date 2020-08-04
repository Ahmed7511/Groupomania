const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/Comment');

router.post('/comments', userCtrl.createComment);
router.get('/comments/:id', userCtrl.getOneComment);
router.get('/comments', userCtrl.getAllComments);
router.put('/comments/:id', userCtrl.updateOneComment);
router.delete('/comments/:id', userCtrl.deleteComment);


module.exports = router;