const Item = require('../models/Item');
const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
  // Get counts for Items and Categories from DB
  const [itemsCount, categoriesCount] = await Promise.all([
    Item.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render('index', {
    title: 'Home',
    itemsCount,
    categoriesCount,
  });
});
