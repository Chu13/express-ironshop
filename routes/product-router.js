const express = require("express");

const ProductModel = require("../models/product-model");
const ReviewModel = require("../models/review-model");

const router = express.Router();

router.get("/search", (req, res, next) => {
  const searchRegex = new RegExp(req.query.userSearch, "i");
  ProductModel
  .find({ name: searchRegex })
  .limit(20)
  .exec()
  .then((searchResults) => {
      res.locals.listOfResults = searchResults;
      res.locals.searchTerm = req.query.userSearch;

      res.render("Product-views/search-page");
  })
  .catch((err) => {
      next(err);
  });
});


router.get("/products/luxury", (req, res, next) => {
    ProductModel
    .find()
    .limit(20)
    .sort({ price: -1 })
    .exec()
    .then((expensiveProducts) => {
        res.locals.listOfExpensiveProducts = expensiveProducts;
        res.render("product-views/luxury-page");
    })
    .catch((err) => {
        next(err);
    });
}); //GET /products/luxury


router.get("/products/value", (req, res, next) => {
    ProductModel
    .find()
    .limit(20)
    .sort({ price: 1 })
    .exec()
    .then((cheapProducts) => {
        res.locals.listOfCheapProducts = cheapProducts;
        res.render("product-views/best-value-page");
    })
    .catch((err) => {
        next(err);
    });
});


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
    if(theProduct.errors) {
      res.locals.validationErrors = err.errors;
      res.render("product-views/product-form");
    }
    else{
      next(err);
  }
  });
});// POST products

router.get("/products/details", (req, res, next) => {
  //req.query.prodId
  ProductModel.findById( req.query.prodId )
  .then((productFromDb) => {
    res.locals.productDetails = productFromDb;
    res.render("product-views/product-details");
  })
  .catch((err) => {
    next(err);
  });
});



router.get("/products/:prodId", (req, res, next) => {
  //req.params.prodId
  ProductModel.findById( req.params.prodId )
  .then((productFromDb) => {
    res.locals.productDetails = productFromDb;
    // res.render("product-views/product-details");

    return ReviewModel.find({ product: req.params.prodId }).exec();
  })
  .then((reviewResults) => {
    res.locals.listOfReviews = reviewResults;

    res.render("product-views/product-details");
  })
  .catch((err) => {
    next(err);
  });
});

// Step 1: show edit form
router.get("/products/:prodId/edit", (req, res, next) => {
  ProductModel.findById( req.params.prodId )
  .then((productFromDb) => {
    res.locals.productDetails = productFromDb;
    res.render("product-views/product-edit");
  })
  .catch((err) => {
    next(err);
  });
});

// Step 2: receive edit submission
router.post("/products/:prodId", (req, res, next) => {
  ProductModel.findById(req.params.prodId)
  .then((productFromDb) => {
    productFromDb.set({
      name: req.body.productName,
      price: req.body.productPrice,
      imageUrl: req.body.productImage,
      description: req.body.productDescription
    });
    res.locals.productDetails = productFromDb;

    return productFromDb.save();
  })
  .then(() => {
    res.redirect(`/products/${req.params.prodId}`);
  })
  .catch((err) => {
    if(err.errors) {
      res.locals.validationErrors = err.errors;
      res.render("product-views/product-edit");
    }
    else {
    next(err);
  }
  });
});

router.get("/products/:prodId/delete", (req, res, next) => {
  ProductModel.findByIdAndRemove(req.params.prodId)
  .then((productFromDb) => {
    res.redirect("/products");
  })
  .catch((err) => {
    next(err);
  });
});
module.exports = router;
