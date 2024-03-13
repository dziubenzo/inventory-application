const Item = require('../models/Item');
const Category = require('../models/Category');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const slugify = require('slugify');

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

exports.create_item_post = [
  // Validate and sanitise all item fields
  body('name', 'Item name must contain between 3 and 200 characters.')
    .trim()
    .isLength({ min: 3, max: 200 })
    .escape(),

  body(
    'description',
    'Category description must contain at least 3 characters.'
  )
    .trim()
    .isLength({ min: 3 })
    .escape(),

  body('category', 'Category must be specified.')
    .trim()
    .isMongoId()
    .isLength({ min: 1 })
    .escape(),

  body(
    'price',
    'Price cannot be lower than 0.01 and cannot contain more than 2 decimal places.'
  )
    .trim()
    .isNumeric({ min: 0.01 })
    .escape(),

  body('in_stock_count', 'Stock cannot be lower than 0')
    .trim()
    .isInt({ min: 0 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const price = req.body.price;
    const in_stock_count = req.body.in_stock_count;

    // Create item with the name field turned into a slug
    const item = new Item({
      name: name,
      description: description,
      category: category,
      price: price,
      in_stock_count: in_stock_count,
      slug: slugify(name, { lower: true }),
    });

    // Render the page again with sanitised values and error messages if there are errors.
    if (!errors.isEmpty()) {
      // Get all categories again
      const allCategories = await Category.find({}, 'name')
        .sort({ name: 1 })
        .exec();

      res.render('create_item', {
        title: 'Create Item',
        allCategories,
        item,
        errors: errors.array(),
      });
      return;
    } else {
      // Check if the category with the same name already exists.
      const itemExists = await Item.findOne({ name: name }).exec();

      // Render the form again with relevant error message
      if (itemExists) {
        // Create custom error array for use in the template
        const errorArray = [{ msg: 'Item already exists.' }];
        // Get all categories again
        const allCategories = await Category.find({}, 'name')
          .sort({ name: 1 })
          .exec();

        res.render('create_item', {
          title: 'Create Item',
          allCategories,
          item,
          errors: errorArray,
        });
        return;
      } else {
        // Save item and redirect to item details
        await item.save();
        res.redirect(item.url);
      }
    }
  }),
];

exports.item_details = asyncHandler(async (req, res, next) => {
  // Get requested item from DB based on URL parameter
  const slug = req.params.slug;
  const [item] = await Item.find({ slug: slug }).populate('category').exec();

  res.render('item_details', { title: 'Item Details', item });
});

exports.update_item_get = asyncHandler(async (req, res, next) => {
  res.send('Update item');
});

exports.update_item_post = asyncHandler(async (req, res, next) => {
  res.send('Update item');
});

exports.delete_item_get = asyncHandler(async (req, res, next) => {
  res.send('Delete item');
});

exports.delete_item_post = asyncHandler(async (req, res, next) => {
  res.send('Delete item');
});
