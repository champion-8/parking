
const { check } = require('express-validator')
const parkingService = require('../services').parking;
const carSizeService = require('../services').carSize;
const parkingRegistrationService = require('../services').parkingRegistration;

module.exports = {
    checkRegist() {
        return [
            check("parkingId").not().isEmpty().withMessage("Please input parking")
                .isInt().withMessage('Parking Id must be a Integer')
                .custom(async (value) => {
                    const parking = await parkingService.getParking({id: value});
                    if (!parking) {
                        throw ("Parking not found");
                    }
                }),
            check("carSizeId").not().isEmpty().withMessage("Please input car size")
                .isInt().withMessage('Car size Id must be a Integer')
                .custom(async (value) => {
                    const carSize = await carSizeService.getCarSize({id: value});
                    if (!carSize) {
                        throw ("Car size not found");
                    }
                }),
            check("numberPlate",).not().isEmpty().withMessage("Please input number plate")
                .isString().withMessage('Number plate must be a String')
                .isLength({max: 20}).withMessage("Number plate is maxlength 20")
                .custom(async (value, {req}) => {
                    const plate = await parkingRegistrationService.getParkingRegistrations(
                        {
                            parkingId: req.body.parkingId, 
                            numberPlate: value, 
                            leaveDate: null, 
                            isActive: true
                        }
                    );
                    if (plate.length > 0) {
                        throw ("Number plate is exists");
                    }
                }),
        ]
    },
    checkLeave() {
        return [
            check("id")
                .isInt().withMessage('Id must be a Integer')
                .custom(async (value) => {
                const regist = await parkingRegistrationService.getParkingRegistration({id: value});
                if (!regist) {
                    throw ("Parking registration not found");
                }
            })
        ]
    },
    checkListPlate() {
        return [
            check("type")
                .isString().withMessage('Type must be a String')
                .isIn(['numberPlate', 'slotNumber']),
            check("carSizeId").optional()
                .isInt().withMessage('Car size Id must be a Integer')
                .custom(async (value, {req}) => {
                    const carSize = await carSizeService.getCarSize({id: value});
                    if (!carSize) {
                        throw ("Car size not found");
                    }
            }),
            check("parkingId").optional()
                .isInt().withMessage('Parking Id must be a Integer')
                .custom(async (value) => {
                    const parking = await parkingService.getParking({id: value});
                    if (!parking) {
                        throw ("Parking not found");
                    }
                }),
        ]
    }
}