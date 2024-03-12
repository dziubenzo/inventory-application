const Item = require('../models/Item');
const asyncHandler = require('express-async-handler');

exports.all_categories = asyncHandler(async (req, res, next) => {
  res.send('All categories');
});

exports.create_category = asyncHandler(async (req, res, next) => {
  res.send('Create category');
});

exports.category_details = asyncHandler(async (req, res, next) => {
  res.send('Category details');
});
