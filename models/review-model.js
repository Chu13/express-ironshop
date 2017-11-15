const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: { type: String },

  stars: {
    type: Number ,
    required: true,
    min: 1,
    max: 5
  },

  authorEmail: {
    type: String,
    match: /.+@.+/ 
  },

  authorName: {
    type: String,
    required: true,
    minlength: 3
  },

  product: { type: Schema.Types.ObjectId }
});

const ReviewModel = mongoose.model("Review", reviewSchema);

module.exports = ReviewModel;
