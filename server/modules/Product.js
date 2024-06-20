const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // The id is automatically generated. I don't kow if that is something natural of MongoDB or Atlas
  // id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  //   auto: true,
  // },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be less than 0'],
    default: 0 // Default value
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
