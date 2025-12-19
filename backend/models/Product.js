const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Aurawill Health Mix'
  },
  price: {
    type: Number,
    required: true,
    default: 300
  },
  weight: {
    type: String,
    default: '900g'
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [{
    name: String,
    tamilName: String,
    benefit: String
  }],
  benefits: [String],
  usage: String,
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 100
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);