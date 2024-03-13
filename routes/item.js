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

// GET update item
router.get('/:slug/update', itemController.update_item_get);

// POST update item
router.post('/:slug/update', itemController.update_item_post);

// GET delete item
router.get('/:slug/delete', itemController.delete_item_get);

// POST delete item
router.post('/:slug/delete', itemController.delete_item_post);

module.exports = router;
