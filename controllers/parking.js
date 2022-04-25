const parkingService = require('../services').parking;

module.exports = {
    async list(req, res) {
        try {
            const list = await parkingService.getParkings(req.query)
            return res.status(200).json({ status: 200, data: list });
        } catch (e) {
            return res.status(400).json({ status: 400, errorMessage: e })
        }
    },

    async add(req, res) {
        try {
            await parkingService.addParking(req.body)
            return res.status(200).json({ status: 200 });
        } catch (e) {
            return res.status(400).json({ status: 400, errorMessage: e })
        }
    },

    async update(req, res) {
        try {
            await parkingService.updateParking({ ...req.body, id: req.params.id });
            return res.status(200).json({ status: 200 });
        } catch (e) {
            return res.status(400).json({ status: 400, errorMessage: e })
        }
    },

    async getParkingStatus(req, res) {
        try {
            const list = await parkingService.getParkings(req.query)
            const result = list.map(o => ({
                ...o.dataValues,
                available: o.dataValues.subParkings.filter(x => x.dataValues.isAvailable === true).length
            }));
            return res.status(200).json({ status: 200, data: result });
        } catch (e) {
            return res.status(400).json({ status: 400, errorMessage: e })
        }
    },
}