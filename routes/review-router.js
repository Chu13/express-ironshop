const express = require("express");


const ProductModel = require("../models/product-model");
const ReviewModel = require("../models/review-model");

const router = express.Router();

// Step 1: Create a new Review
router.get("/products/:prodId/reviews/new", (req, res, next) => {
  ProductModel.findById(req.params.prodId)
  .then((productFromDb) =>{
    res.locals.productDetails = productFromDb;

    res.render("review-views/review-form");
  })
  .catch((err) => {
    next(err);
  });
});

// Step 2: process the new review submission
router.post("/products/:prodId/reviews", (req, res, next) => {
  ProductModel.findById(req.params.prodId)
  .then((productFromDb) => {
    const theReview = new ReviewModel({
      content: req.body.reviewContent,
      stars: req.body.reviewStars,
      authorEmail: req.body.reviewAuthorEmail ,
      authorName: req.body.reviewAuthorName ,
      product: req.params.prodId
    });

    res.locals.productDetails = productFromDb;

    return theReview.save();
  })
  .then(() => {
    res.redirect(`/products/${req.params.prodId}`);
  })
  .catch((err) => {
    if (err.errors) {
      res.locals.validationErrors = err.errors;
      res.render("review-views/review-form");
    }
    else {
      next(err);
    }
  });
});


module.exports = router;
