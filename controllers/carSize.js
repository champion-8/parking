const Sequelize = require('sequelize')
const CarSize = require('../.models').CarSize;

const carSizeService = require('../services').carSize;

const Op = Sequelize.Op;

module.exports = {
    async list(req, res) {
        try {
            const list = await carSizeService.getCarSizes(req.query)
            return res.status(200).json({ status: 200, data: list });
        } catch (e) {
            return res.status(400).json({ status: 400, errorMessage: e })
        }
    },

    async add(req, res) {
        try {
            await carSizeService.addCarSize(req.body)
            return res.status(200).json({ status: 200 });
        } catch (e) {
            return res.status(400).json({ status: 400, errorMessage: e })
        }
    },

    async update(req, res) {
        try {
            await carSizeService.updateCarSize({ ...req.body, id: req.params.id });
            return res.status(200).json({ status: 200 });
        } catch (e) {
            return res.status(400).json({ status: 400, errorMessage: e })
        }
    }
}