const { sequelize } = require('../.models');
const ParkingRegistration = require('../.models').ParkingRegistration;
const Parking = require('../.models').Parking;
const SubParking = require('../.models').SubParking;
const CarSize = require('../.models').CarSize;
const parkingService = require('./parking');
const subParkingService = require('./subParking');

exports.getParkingRegistration = async function(data) {
    try {
        return await ParkingRegistration.findOne({ where: data });
    } catch (e) {
        throw('Error getParkingRegistration : ' + e)
    }
}

exports.getParkingRegistrations = async function(criteria) {
    try {
        const { carSizeId, parkingId, numberPlate, leaveDate } = criteria

        let criteria1 = {}
        if (carSizeId !== undefined) {
            criteria1 = { carSizeId }
        }

        if (numberPlate !== undefined) {
            criteria1 = { ...criteria1, numberPlate }
        }

        if (leaveDate !== undefined) {
            criteria1 = { ...criteria1, leaveDate }
        }
        

        let criteria2 = {}
        if (parkingId !== undefined) {
            criteria2 = { parkingId }
        }
        return await ParkingRegistration.findAll({
            include: [{
                model: CarSize,
                as: 'carSizes',
                where: { isActive: true },
                required: true
            },
            {
                model: SubParking,
                as: 'subParkings',
                where: { ...criteria2, isActive: true },
                required: true
            }],
            where: criteria1
        });
    } catch (e) {
        throw('Error getParkingRegistrations : ' + e)
    }
}

exports.registration = async function(data) {
    const transaction = await sequelize.transaction();
    try {
        const subParking = await subParkingService.getSubParkings({parkingId: data.parkingId, isAvailable: true, isActive: true});
        if(subParking.length > 0) {
            const { id, name } = subParking.sort((a,b) => a.seq - b.seq)[0];
            await ParkingRegistration 
                .create({
                    subParkingId: id,
                    carSizeId: data.carSizeId,
                    numberPlate: data.numberPlate,
                    registrationDate: new Date(),
                    isActive: true
                }, { transaction });

            await SubParking
                .update({
                    isAvailable: false
                },
                { where: { id } },
                { transaction });

            await transaction.commit();
            return { id, name }
        } else {
            throw('Parink is full')
        }
         
    } catch (e) {
        if (transaction)
            await transaction.rollback();
        throw('Error registration : ' + e)
    }
}


exports.leave = async function(data) {
    const transaction = await sequelize.transaction();
    try {
        const regist = await ParkingRegistration.findByPk(data.id);
        if (regist) {
            await regist.update({
                leaveDate: new Date()
            }, { transaction });

            await SubParking
                .update({
                    isAvailable: false
                },
                { where: { id: regist.subParkingId } },
                { transaction });

            await transaction.commit();
        }

    } catch (e) {
        if (transaction)
            await transaction.rollback();
        throw('Error leave : ' +  e)
    }
}