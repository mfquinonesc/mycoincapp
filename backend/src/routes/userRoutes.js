const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('',userController.createUser);

router.get('/:phone',userController.getUserByPhone);

router.patch('/:phone',userController.patchUserByPhone);

module.exports = router;