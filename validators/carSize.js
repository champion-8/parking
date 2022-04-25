
const { check } = require('express-validator')
const carSizeService = require('../services').carSize;
const parkingRegistService = require('../services').parkingRegistration;

module.exports = {
    checkAddCarSize() {
        return [
            check("name",)
                .not().isEmpty().withMessage("Please input name")
                .isString().withMessage('Name must be a String')
                .isLength({max: 50}).withMessage("Name is maxlength 50")
                .custom(async (value) => {
                    const carSize = await carSizeService.getCarSize({name: value});
                    if(carSize)
                        throw ("Name is exists");
                }),
        ]
    },
    checkUpdateCarSize() {
        return [
            check("id")
                .isInt().withMessage("Id  must be a Integer")
                .custom(async (value) => {
                const carSize = await carSizeService.getCarSize({id: value});
                if (!carSize) {
                    throw ("Car size not found");
                }
            }),
            check("name",).optional()
                .isString().withMessage('Name must be a String')
                .isLength({max: 50}).withMessage("Name is maxlength 50"),
            check("isActive").optional()
                .isBoolean().withMessage("Status is not correct")
                .custom(async (value, { req }) => {
                    if(value == false) {
                        const parkingRegist = await parkingRegistService.getParkingRegistrations({
                            carSizeId: req.params.id,
                            leaveDate: null,
                            isActive: true
                        });

                        if(parkingRegist.length > 0)
                            throw ("Car size is use, cannot inactive");
                    }
                }),
        ]
    }
}