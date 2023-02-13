const express = require('express')

const upload = require('../middlewares/upload')
const adminController = require('../controllers/')


const router = express.Router()

router.patch('',
    upload.fields(
        [
            { name: 'productImage' },
            {name: 'roasterImage'}
        ]),

        adminController.updateProduct
);

module.exports = router