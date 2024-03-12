const Item = require('../models/Item');
const asyncHandler = require('express-async-handler');

exports.all_items = asyncHandler(async (req, res, next) => {
  res.send('All items');
});

exports.create_item = asyncHandler(async (req, res, next) => {
  res.send('Create item');
});

exports.item_details = asyncHandler(async (req, res, next) => {
  res.send('Item details');
});
