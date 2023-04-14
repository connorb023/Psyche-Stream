const express = require('express');
const router = express.Router();

// Import userController
const userController = require('../controllers/userController');

// Define user routes
router.get('/', userController.index);
router.post('/', userController.create);
router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
