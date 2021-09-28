const mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
  product_id: {type: Number, index: {unique: true}},
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features_id: Number
});

var productStyles = mongoose.Schema({
  product_id: Number,
  style_id: Number,
  name: String,
  original_price: String,
  sale_price: String,
  default: String
});

var relatedProducts

var featuresSchema = mongoose.Schema({
  features_id: Number,
  feature: String,
  value: String
});

