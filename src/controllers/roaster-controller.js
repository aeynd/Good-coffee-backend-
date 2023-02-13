const {Roaster} = require('../models')


exports.getAllRoaster = async (req, res, next) => {
    try {
        const roasters = await Roaster.findAll()
        res.status(200).json({roasters})
    } catch (err) {
        next(err)
    }
};

