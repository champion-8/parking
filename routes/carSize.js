var express = require('express');
var router = express.Router();

const carSizeController = require('../controllers').carSize;
const carSizeValidator = require('../validators').carSize;
const { handleValidationError } = require('../middlewares')


router.get('/car-size', carSizeController.list);
router.post('/car-size', carSizeValidator.checkAddCarSize(), handleValidationError, carSizeController.add);
router.put('/car-size/:id', carSizeValidator.checkUpdateCarSize(), handleValidationError, carSizeController.update);

module.exports = router;
