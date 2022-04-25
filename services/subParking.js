const { database } = require('pg/lib/defaults');

const SubParking = require('../.models').SubParking;

exports.getParkingAvailable = async function(data) {
    try {
        const subparking =  await SubParking.findAll(
            { 
                include: [{
                    model: Parking,
                    as: 'parkings',
                    attributes:['slot']
                }],
                where: data
            });
        return subparking;
    } catch (e) {
        throw('Error getParkingAvailable : ' + e)
    }
}

exports.getSubParkings = async function(data) {
    try {
        return await SubParking.findAll({where: data});
    } catch (e) {
        throw('Error getParkingAvailable : ' + e)
    }
}
