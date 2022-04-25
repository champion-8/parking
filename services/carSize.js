const Sequelize = require('sequelize')
const CarSize = require('../.models').CarSize;

const Op = Sequelize.Op;

exports.getCarSize = async function(data) {
    try {
        return await CarSize.findOne({ where: data });
    } catch (e) {
        throw('Error getCarSize')
    }
}

exports.getCarSizes = async function(query) {
    try {
        const { name } = query;
        let criteria = {}
        if(name) {
            criteria = {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        }

        return await CarSize.findAll({where: criteria});
    } catch (e) {
        throw('Error getCarSizes')
    }
}

exports.addCarSize = async function(data) {
    try {
        await CarSize 
            .create({
                name: data.name,
                isActive: true
            });
    } catch (e) {
        throw('Error addCarSize')
    }
}

exports.updateCarSize = async function(data) {
    try {
        const carSize = await CarSize.findByPk(data.id);
        if (carSize) {
            carSize.update({
                name: data.name || carSize.name,
                isActive: data.isActive || carSize.isActive,
            });
        }
    } catch (e) {
        throw('Error updateCarSize')
    }
}
    