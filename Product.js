const mongoose = require('mongoose');
// Define the schema for the product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  image: {
     type: String, 
     required: true 
  }
},);

// Create and export the product model
module.exports = mongoose.model('Product', productSchema);
