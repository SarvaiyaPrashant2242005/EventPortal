const Company = require('../models/Company');
const Package = require('../models/Packages');
const User = require('../models/User');

// Register a new company
exports.registerCompany = async (req, res) => {
  try {
    // Check if package exists
    const package = await Package.findById(req.body.packageId);
    if (!package) {
      return res.status(400).json({
        success: false,
        message: 'Package not found'
      });
    }

    // Create company
    const company = new Company(req.body);
    await company.save();

    res.status(201).json({
      success: true,
      data: company
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Company with this email already exists'
      });
    }
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
      .populate('packageId', 'name durationMonths maxEvents maxEmployees price')
      .populate('admins', 'firstName lastName email');
    
    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single company by ID
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
      .populate('packageId')
      .populate('admins');
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update company status (approve/reject/suspend)
exports.updateCompanyStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['approved', 'rejected', 'suspended'];
    
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update company details
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    res.status(200).json({
      success: true,
      data: company
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete company
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    
    if (!company) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    // TODO: In a real app, you might want to delete associated users and data
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search companies
exports.searchCompanies = async (req, res) => {
  try {
    const { query } = req.query;
    const companies = await Company.find({
      $text: { $search: query }
    }).populate('packageId', 'name');
    
    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get companies by status
exports.getCompaniesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const companies = await Company.find({ status })
      .populate('packageId', 'name');
    
    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};