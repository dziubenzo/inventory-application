const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 200, unique: true },
  description: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true, min: 0.01 },
  in_stock_count: { type: Number, required: true, min: 0 },
  slug: { type: String, required: true, maxLength: 100 },
});

// Virtual for item's URL
ItemSchema.virtual('url').get(function () {
  return `/items/${this.slug}`;
});

module.exports = mongoose.model('Item', ItemSchema);
