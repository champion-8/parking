const Sequelize = require('sequelize')
const { sequelize } = require('../.models');
const Parking = require('../.models').Parking;
const SubParking = require('../.models').SubParking;

const Op = Sequelize.Op;

exports.getParking = async function(data) {
    try {
        return await Parking.findOne({ where: data });
    } catch (e) {
        throw('Error getParking : ' + e)
    }
}

exports.getParkings = async function(query) {
    try {
        const { id, name } = query;
        let criteria = {}
        if(name) {
            criteria = {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        }

        if(id) {
            criteria = {
                ...criteria,
                id
            }
        }
        return await Parking.findAll({
            include: [{
                model: SubParking,
                as: 'subParkings',
                where: { isActive: true }
            }],
            where: criteria
        });
    } catch (e) {
        throw('Error getParkings : ' + e)
    }
}

exports.addParking = async function(data) {
    
    const transaction = await sequelize.transaction();
    try {
        const parking = await Parking 
            .create({
                name: data.name,
                slot: data.slot,
                isActive: true
            }, { transaction });

        let cnt = 1;
        for(const item in data.subParkings)
        {
            await SubParking 
            .create({
                name: data.subParkings[item].name,
                parkingId: parking.id,
                seq: cnt,
                isAvailable: true,
                isActive: true
            }, { transaction });
            cnt++;
        }

        await transaction.commit();
    } catch (e) {
        if (transaction)
            await transaction.rollback();
        throw('Error addParking : ' + e)
    }
}

exports.updateParking = async function(data) {
    const transaction = await sequelize.transaction();
    try {

        const parking = await Parking.findByPk(data.id, {
            include: [{
                model: SubParking,
                as: 'subParkings'
            }]
        });

        if (parking) {
            await parking.update({
                name: data.name || parking.name,
                slot: data.slot || parking.slot,
                isActive: data.isActive || parking.isActive,
            }, { transaction });

            
            for(const item in parking.subParkings)
            {
                if(!data.subParkings.map(o => o.id).include(parking.subParkings[item].id)) {
                    const subParking = await SubParking.findByPk(parking.subParkings[item].id);
                    if (subParking) {
                        subParking.update({isActive: false}, { transaction });
                    }
                }
            }

            let cnt = 1;
            for(const item in data.subParkings)
            {
                const { id, name, isActive } = data.subParkings[item];
                if (id != null && id != undefined) {
                    const subParking = await SubParking.findByPk(id);
                    if (subParking) {
                        await subParking.update({
                            name,
                            isActive,
                            seq: cnt
                        }, { transaction });
                    }
                }
                else {
                    await SubParking 
                    .create({
                        name: data.subParkings[item].name,
                        parkingId: parking.id,
                        seq: cnt,
                        isAvailable: true,
                        isActive
                    }, { transaction });
                }
                cnt++;
            }
        }
        await transaction.commit();
    } catch (e) {
        if (transaction)
            await transaction.rollback();
        throw('Error updateParking : ' + e)
    }
}