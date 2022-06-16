const express = require("express");
const router = express.Router();
const Product = require("../module/Product");
const Fav = require("../module/Favorites");

router.get("/", async (req, res) => {
  const product = await Product.getAll();
  const favs = await Fav.getFav();
  const data = new Date();

  console.log(data.toDateString());
  res.render("index", {
    title: "Olcha",
    pro: product,
    card: favs,
  });
});

module.exports = router;
