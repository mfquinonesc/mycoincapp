const router = require('express').Router();
const codeController = require('../controllers/codeController');

router.get('/:phone', codeController.getCodeByPhone);

router.post('/', codeController.createCodeByPhone);

module.exports = router;