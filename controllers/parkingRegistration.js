const _ = require('lodash');
const parkingRegistService = require('../services').parkingRegistration;


module.exports = {
    async regist(req, res) {
        try {
            const data = await parkingRegistService.registration(req.body)
            return res.status(200).json({ status: 200, data });
        } catch (e) {
            return res.status(400).json({ status: 400, errorMessage: e })
        }
        
    },

    async leave(req, res) {
        try {
            await parkingRegistService.leave({ ...req.body, id: req.params.id });
            return res.status(200).json({ status: 200 });
        } catch (e) {
            return res.status(400).json({ status: 400, errorMessage: e })
        }
        
    },

    async getListRegist(req, res) {
        try {
            const {type} = req.params;
            const data = await parkingRegistService.getParkingRegistrations({...req.query, leaveDate: null})

            const keys = ['parkingId', 'name']
            let group = data.reduce((objectsByKeyValue, obj) => {
                keys.reduce((builder, key, index) => {
                if (index !== keys.length - 1) {
                    if (key === 'parkingId')
                        builder[obj.dataValues.subParkings[key]] = builder[obj.dataValues.subParkings[key]] || {};
                    else 
                        builder[obj.dataValues.carSizes[key]] = builder[obj.dataValues.carSizes[key]] || {};
                } else {
                    if (key === 'parkingId')
                        builder[obj.dataValues.subParkings[key]] = (builder[obj.dataValues.subParkings[key]] || []).concat(type==='numberPlate' ? obj.dataValues.numberPlate : obj.dataValues.subParkings.name);
                    else 
                        builder[obj.dataValues.carSizes[key]] = (builder[obj.dataValues.carSizes[key]] || []).concat(type==='numberPlate' ? obj.dataValues.numberPlate : obj.dataValues.subParkings.name);
                }

                if (key === 'parkingId')
                    return builder[obj.dataValues.subParkings[key]];
                else 
                    return builder[obj.dataValues.carSizes[key]];

                }, objectsByKeyValue);
            
                return objectsByKeyValue;
            }, {})

            return res.status(200).json({ status: 200, data: group });
        } catch (e) {
            return res.status(400).json({ status: 400, errorMessage: e })
        }
    }
}