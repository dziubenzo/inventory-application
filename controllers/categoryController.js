const Category = require('../models/Category');
const Item = require('../models/Item');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const slugify = require('slugify');
const mongoose = require('mongoose');

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
    // Extract the validation errors from a request
    const errors = validationResult(req);

    const name = req.body.name;
    const description = req.body.description;

    // Create category with the name field turned into a slug
    const category = new Category({
      name: name,
      description: description,
      slug: slugify(name, { lower: true }),
    });

    // Render the page again with sanitised values and error messages if there are errors
    if (!errors.isEmpty()) {
      res.render('create_category', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });
      return;
    } else {
      // Check if the category with the same name already exists
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
        return;
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

exports.update_category_get = asyncHandler(async (req, res, next) => {
  // Get requested category from DB based on URL parameter
  const slug = req.params.slug;
  const [category] = await Category.find({ slug: slug }).exec();

  res.render('update_category', { title: 'Update Category', category });
});

exports.update_category_post = [
  // Validate and sanitise both category fields and password
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

  body('password', 'Password must contain at least 1 character.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    // Get password from external DB collection
    const [password] = await mongoose.connection.db
      .collection('password')
      .find()
      .toArray();

    const slug = req.params.slug;
    const name = req.body.name;
    const description = req.body.description;
    const guess = req.body.password;

    // Render the form again if the password is incorrect
    if (guess.toString() !== password.value.toString()) {
      // Create custom error array for use in the template
      const errorArray = [{ msg: 'Wrong password.' }];

      res.render('update_category', {
        title: 'Update Category',
        category: { name, description },
        errors: errorArray,
      });
      return;
    }

    // Get ID of the edited category
    const [oldCategory] = await Category.find({ slug: slug }, '_id').exec();

    // Create category with the name field turned into a slug and the old ID
    const category = new Category({
      _id: oldCategory._id,
      name: name,
      description: description,
      slug: slugify(name, { lower: true }),
    });

    // Render the page again with sanitised values and error messages if there are errors
    if (!errors.isEmpty()) {
      res.render('update_category', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });
      return;
    } else {
      // Update category and redirect to updated category details
      const updatedCategory = await Category.findByIdAndUpdate(
        category._id,
        category,
        { new: true }
      );
      res.redirect(updatedCategory.url);
    }
  }),
];

exports.delete_category_get = asyncHandler(async (req, res, next) => {
  // Get requested category from DB based on URL parameter
  const slug = req.params.slug;
  const [category] = await Category.find(
    { slug: slug },
    'name slug url'
  ).exec();
  // Get all items in this category
  const allCategoryItems = await Item.find({ category: category })
    .sort({ name: 1 })
    .exec();

  res.render('delete_category', {
    title: 'Delete Category',
    category,
    allCategoryItems,
  });
});

exports.delete_category_post = asyncHandler(async (req, res, next) => {
  res.send('Delete category');
});
