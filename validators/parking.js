const _ = require('lodash');
const { check } = require('express-validator')
const parkingService = require('../services').parking;
const subParkingService = require('../services').subParking;
const parkingRegistService = require('../services').parkingRegistration;

module.exports = {

// Get Parking
// {
//     id: integer,
//     name: string,
// }
  checkGetParking() {
    return [
      check("name")
        .optional()
        .isString()
        .withMessage("Name must be a String")
        .isLength({ max: 50 })
        .withMessage("Parking name is maxlength 50"),
      check("id")
        .optional()
        .isInt()
        .withMessage("Id must be a Integer")
        .custom(async (value) => {
          const parking = await parkingService.getParking({ id: value });
          if (!parking) {
            throw "Parking not found";
          }
        }),
    ];
  },
  // Add Parking
  // {
  //     name: string,
  //     slot: integer,
  //     subParkings: [
  //         {
  //             name: string
  //         }
  //     ]
  // }
  // slot and subParkings.length is equals
  checkAddParking() {
    return [
      check("name")
        .not()
        .isEmpty()
        .withMessage("Please input parking name")
        .isString()
        .withMessage("Name must be a String")
        .isLength({ max: 50 })
        .withMessage("Parking name is maxlength 50")
        .custom(async (value) => {
          const parking = await parkingService.getParking({ name: value });
          if (parking) throw "Name is exists";
        }),
      check("slot")
        .not()
        .isEmpty()
        .withMessage("Please input slot")
        .isInt()
        .withMessage("Slot  must be a Integer"),
      check("subParkings")
        .isArray()
        .withMessage("Sub parking format is invalid"),
      check("subParkings.*.name")
        .not()
        .isEmpty()
        .withMessage("Please input sub parking name")
        .isString()
        .withMessage("Sub parking name must be a String")
        .isLength({ max: 50 })
        .withMessage("Sub parking name is maxlength 50")
        .custom(async (value, { req }) => {
          if (req.body.subParkings.filter((o) => o.name === value).length > 1)
            throw "Sub parking name is duplicate";
          else if (req.body.subParkings.length != req.body.slot)
            throw "Sub parking is not related slot";
        }),
    ];
  },

  // UPDATE Parking
  // {
  //     id: integer,
  //     name: string,
  //     slot: integer,
  //     subParkings: [
  //         {
  //             name: string,
  //             isActive: boolean
  //         }
  //     ],
  //     isActive: boolean,
  // }
  // slot and subParkings.length is equals
  checkUpdateParking() {
    return [
      check("id")
        .isInt()
        .withMessage("Id must be a Integer")
        .custom(async (value) => {
          const parking = await parkingService.getParking({ id: value });
          if (!parking) {
            throw "Parking not found";
          }
        }),
      check("name")
        .optional()
        .isString()
        .withMessage("Name must be a String")
        .isLength({ max: 50 })
        .withMessage("Name is maxlength 50"),
      check("slot").optional().isInt().withMessage("Slot must be a Integer"),
      check("isActive")
        .optional()
        .isBoolean()
        .withMessage("Status is not correct")
        .custom(async (value, { req }) => {
          if (value == false) {
            const subParking = await subParkingService.getSubParkings({
              parkingId: req.params.id,
              isAvailable: false,
              isActive: true,
            });

            if (subParking.length > 0)
              throw "Parking is use, cannot change inactive";
          }
        }),
      check("subParkings")
        .optional()
        .isArray()
        .withMessage("Sub parking format is invalid"),
      check("subParkings.*.name")
        .optional()
        .isString()
        .withMessage("Name must be a String")
        .isLength({ max: 50 })
        .withMessage("Sub parking name is maxlength 50")
        .custom(async (value, { req }) => {
          if (req.body.subParkings.filter((o) => o.name === value).length > 1)
            throw "Sub parking name is duplicate";
          else if (req.body.subParkings.length != req.body.slot)
            throw "Sub parking is not related slot";
        }),
      check("subParkings.*.isActive")
        .optional()
        .isBoolean()
        .withMessage("Sub parking is not correct")
        .custom(async (value, { req, location, path }) => {
          const index = _.toPath(path)[1];
          const { id } = req[location].subParkings[index];
          if (value == false && id != null && id != undefined) {
            const subParking = await subParkingService.getSubParking({ id });
            if (!subParking) {
              throw "Sub parking not found by id : " + id;
            } else if (subParking.isAvailable == false) {
              throw "Sub parking is not available (" + subParking.name + ")";
            }
          }
        }),
    ];
  },
};