const express = require('express')
const router = express.Router()
const Product = require('../module/Product')


router.get('/', async (req, res) => {
    const product = await Product.getAll()

    res.render('index', {
        title: 'Olcha',
        card: product
    })
})  

module.exports = router