const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema ({
  name: { type: String },
  price: { type: Number },

  imageUrl: { type: String },
  description: { type: String },
  dateAdded: { type: Date },
});

const ProductModel = mongoose.model("Product", productSchema);


module.exports = ProductModel;
