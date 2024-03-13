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

// GET update category
router.get('/:slug/update', categoryController.update_category_get);

// POST update category
router.post('/:slug/update', categoryController.update_category_post);

// GET delete category
router.get('/:slug/delete', categoryController.delete_category_get);

// POST delete category
router.post('/:slug/delete', categoryController.delete_category_post);

module.exports = router;
