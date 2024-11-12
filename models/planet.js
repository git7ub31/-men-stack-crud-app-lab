const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  name: String, 
  description: { type: Number, required: false },
})

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;
