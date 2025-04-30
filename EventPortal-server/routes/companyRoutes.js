const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Company routes
router.post('/', companyController.registerCompany);
router.get('/', companyController.getAllCompanies);
router.get('/search', companyController.searchCompanies);
router.get('/status/:status', companyController.getCompaniesByStatus);
router.get('/:id', companyController.getCompany);
router.put('/:id', companyController.updateCompany);
router.patch('/:id/status', companyController.updateCompanyStatus);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;