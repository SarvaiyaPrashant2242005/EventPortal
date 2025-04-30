const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Package routes
router.post('/', packageController.createPackage);
router.get('/', packageController.getAllPackages);
router.get('/search', packageController.searchPackages);
router.get('/:id', packageController.getPackage);
router.put('/:id', packageController.updatePackage);
router.delete('/:id', packageController.deletePackage);

module.exports = router;