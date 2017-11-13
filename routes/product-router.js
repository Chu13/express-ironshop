const express = require("express");

const ProductModel = require("../models/product-model");

const router = express.Router();

router.get("/products", (req, res, next) => {
  ProductModel
  .find()
  .limit(25)
  .sort({ dateAdded: -1})
  .exec()
  .then((productResults) => {
    res.locals.listOfProducts = productResults;
    res.render("product-views/product-list");
  })
  .catch((err) => {
    next(err);
  });
});// Get /products

// STEP 1: show the new product form
router.get("/products/new", (req, res, next) => {
  res.render("product-views/product-form");
});// GET /products


// STEP 2: process the new product submission
router.post("/products", (req, res, next) => {
  const theProduct = new ProductModel({
    name: req.body.productName ,
    price: req.body.productPrice,
    imageUrl: req.body.productImage,
    description: req.body.productDescription,
    dateAdded: new Date()
  });

  theProduct.save()
  .then(() => {
    // STEP 3: redirect after a SUCCESSFUL save
    // redirect to the list of products page
    res.redirect("/products");
    // you can't redirect to an EJS file
    // you can ONLY redirect to a URL
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
