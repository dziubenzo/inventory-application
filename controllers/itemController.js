const Item = require('../models/Item');
const asyncHandler = require('express-async-handler');

exports.all_items = asyncHandler(async (req, res, next) => {
  // Get all items from DB
  const allItems = await Item.find({}, 'name category slug')
    .populate('category')
    .sort({ name: 1 })
    .exec();

  res.render('all_items', { title: 'Items', allItems });
});

exports.create_item = asyncHandler(async (req, res, next) => {
  res.send('Create item');
});

exports.item_details = asyncHandler(async (req, res, next) => {
  res.send('Item details');
});
