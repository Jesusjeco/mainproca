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
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
