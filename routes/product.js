const express = require('express')
const router = express.Router()
const Product = require('../module/Product')
const Fav = require('../module/Favorites')

router.get('/', async (req, res) => {
    const favs = await Fav.getFav()
    res.render('product', {
        title: 'Product',
        card: favs
    })
})

router.post('/add', async (req, res) => {
    console.log(req.body.id)
    const pro = await Product.findById(req.body.id)
    await Fav.addProduct(pro)
    res.redirect('/')
})


module.exports = router