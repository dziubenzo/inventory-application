const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

// GET all items
router.get('/', itemController.all_items);

// GET create item
router.get('/create', itemController.create_item_get);

// POST create item
router.post('/create', itemController.create_item_post);

// GET item details
router.get('/:slug', itemController.item_details);

module.exports = router;
