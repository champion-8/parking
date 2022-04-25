var express = require('express');
var router = express.Router();

const parkingController = require('../controllers').parking;
const parkingValidator = require('../validators').parking;
const { handleValidationError } = require('../middlewares')


router.get('/parking', parkingValidator.checkGetParking(), handleValidationError, parkingController.list);
router.post('/parking', parkingValidator.checkAddParking(), handleValidationError, parkingController.add);
router.put('/parking/:id', parkingValidator.checkUpdateParking(), handleValidationError, parkingController.update);

router.get('/parking/status', parkingValidator.checkGetParking(), handleValidationError, parkingController.getParkingStatus);


module.exports = router;
