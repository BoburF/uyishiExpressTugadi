const express = require("express");
const router = express.Router();
const Product = require("../module/Product");
const Fav = require("../module/Favorites");
const Dl = require("../module/Delivery");

router.get("/", async (req, res) => {
  const favs = await Fav.getFav();



  res.render("product", {
    title: "Product",
    card: favs,
  });
});

router.post("/add", async (req, res) => {
  console.log(req.body.id);
  const pro = await Product.findById(req.body.id);
  await Fav.addProduct(pro);
  res.redirect("/");
});

router.post("/delivery/:id", async (req, res) => {
  const pro = await Fav.findById(req.body.id);
  const card = await Fav.removeById(req.params.id);
  await Dl.addProduct(pro);
  res.redirect("/products/delivery");
});

// router.get('/dl', async (req, res) => {
//     const card = await Dl.getDl()
//     res.render('delivery', {
//         card,
//         title: 'Delivery'
//     })
// })

router.delete("/delete/:id", async (req, res) => {
  const card = await Fav.removeById(req.params.id);
  res.send(card);
});

router.get("/delivery", async (req, res) => {
  const favs = await Fav.getFav();
  const card = await Dl.getDl();
  res.render("delivery", {
    card: favs,
    cards: card,
    title: "Delivery",
  });
});

module.exports = router;
