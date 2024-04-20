const router = require('express').Router();
const authController = require('../controllers/authController');

router.post('/signin', authController.signIn);

router.post('/verify', authController.verify);

module.exports = router;