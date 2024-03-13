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

exports.create_category_get = asyncHandler(async (req, res, next) => {
  res.render('create_category', {title: 'Create Category'})
});

exports.create_category_post = asyncHandler(async (req, res, next) => {
  res.send('Create category');
});

exports.category_details = asyncHandler(async (req, res, next) => {
  // Get requested category from DB based on URL parameter
  const slug = req.params.slug;
  const [category] = await Category.find({ slug: slug }).exec();
  // Get all items in this category
  const allCategoryItems = await Item.find({ category: category })
    .sort({ name: 1 })
    .exec();

  res.render('category_details', {
    title: 'Category Details',
    category,
    allCategoryItems,
  });
});
