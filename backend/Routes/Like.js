const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/Like');
const auth = require('../middleware/auth');

router.post('/',auth, userCtrl.reactPost);



module.exports = router;

