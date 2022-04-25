var express = require('express');
var router = express.Router();

const parkingRegistrationController = require('../controllers').parkingRegistration;
const parkingRegistValidator = require('../validators').parkingRegistration;
const { handleValidationError } = require('../middlewares')


router.post('/parking-regist', parkingRegistValidator.checkRegist(), handleValidationError, parkingRegistrationController.regist);
router.put('/parking-regist/:id', parkingRegistValidator.checkLeave(), handleValidationError, parkingRegistrationController.leave);


router.get('/parking-regist/list-plate/:type', parkingRegistValidator.checkListPlate(), handleValidationError, parkingRegistrationController.getListRegist);

module.exports = router;
