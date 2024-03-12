const Category = require('../models/Category');
const Item = require('../models/Item');
const asyncHandler = require('express-async-handler');

exports.all_categories = asyncHandler(async (req, res, next) => {
  // Get all categories from DB
  const allCategories = await Category.find({}).sort({ name: 1 }).exec();
  // Add count of items to each category
  for (const category of allCategories) {
    category.itemCount = await Item.countDocuments({
      category: category._id,
    }).exec();
  }

  res.render('all_categories', { title: 'Categories', allCategories });
});

exports.create_category = asyncHandler(async (req, res, next) => {
  res.send('Create category');
});

exports.category_details = asyncHandler(async (req, res, next) => {
  res.send('Category details');
});
