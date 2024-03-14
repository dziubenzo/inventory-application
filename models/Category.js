const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
    unique: true,
  },
  description: { type: String, required: true, minLength: 3, maxLength: 400 },
  slug: {
    type: String,
    required: true,
    maxLength: 150,
  },
});

// Virtual for category's URL
CategorySchema.virtual('url').get(function () {
  return `/categories/${this.slug}`;
});

module.exports = mongoose.model('Category', CategorySchema);
