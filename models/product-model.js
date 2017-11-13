const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema ({
  // fields here
});

const ProductModel = mongoose.model("Product", productSchema);


module.exports = ProductModel;
