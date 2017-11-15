const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },

  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 300
  },
  dateAdded: { type: Date },
});

const ProductModel = mongoose.model("Product", productSchema);


module.exports = ProductModel;
