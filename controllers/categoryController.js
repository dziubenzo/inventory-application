const Category = require('../models/Category');
const Item = require('../models/Item');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const slugify = require('slugify');

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
  res.render('create_category', { title: 'Create Category' });
});

exports.create_category_post = [
  // Validate and sanitise both category fields
  body('name', 'Category name must contain between 3 and 100 characters.')
    .trim()
    .isLength({ min: 3, max: 100 })
    .escape(),

  body(
    'description',
    'Category description must contain between 3 and 400 characters.'
  )
    .trim()
    .isLength({ min: 3, max: 400 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const name = req.body.name;
    const description = req.body.description;

    // Create category with the name field turned into a slug
    const category = new Category({
      name: name,
      description: description,
      slug: slugify(name, { lower: true }),
    });

    // Render the page again with sanitised values and error messages if there are errors.
    if (!errors.isEmpty()) {
      res.render('create_category', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });
    } else {
      // Check if the category with the same name already exists.
      const categoryExists = await Category.findOne({ name: name }).exec();

      // Render the form again with relevant error message
      if (categoryExists) {
        // Create custom error array for use in the template
        const errorArray = [{ msg: 'Category already exists.' }];
        res.render('create_category', {
          title: 'Create Category',
          category,
          errors: errorArray,
        });
      } else {
        // Save category and redirect to category details
        await category.save();
        res.redirect(category.url);
      }
    }
  }),
];

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
