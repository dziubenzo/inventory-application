const Item = require('../models/Item');
const Category = require('../models/Category');

const asyncHandler = require('express-async-handler');

exports.all_items = asyncHandler(async (req, res, next) => {
  // Get all items from DB
  const allItems = await Item.find({}, 'name category slug')
    .populate('category')
    .sort({ name: 1 })
    .exec();

  res.render('all_items', { title: 'Items', allItems });
});

exports.create_item_get = asyncHandler(async (req, res, next) => {
  // Get all categories from DB for use in the form
  const allCategories = await Category.find({}, 'name')
    .sort({ name: 1 })
    .exec();

  res.render('create_item', { title: 'Create Item', allCategories });
});

exports.create_item_post = asyncHandler(async (req, res, next) => {
  res.send('Create item');
});

exports.item_details = asyncHandler(async (req, res, next) => {
  // Get requested item from DB based on URL parameter
  const slug = req.params.slug;
  const [item] = await Item.find({ slug: slug }).populate('category').exec();

  res.render('item_details', { title: 'Item Details', item });
});
