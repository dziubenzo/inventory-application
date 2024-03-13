const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

// GET all categories
router.get('/', categoryController.all_categories);

// GET create category
router.get('/create', categoryController.create_category_get);

// POST create category
router.post('/create', categoryController.create_category_post);

// GET category details
router.get('/:slug', categoryController.category_details);

module.exports = router;
