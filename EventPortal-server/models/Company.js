const mongoose = require('mongoose');
const Package = require('./Packages');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  phone: {
    type: String,
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  packageStartDate: {
    type: Date,
    default: Date.now
  },
  packageEndDate: Date, // Will be calculated based on package duration
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  currentEventCount: {
    type: Number,
    default: 0
  },
  currentEmployeeCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate packageEndDate before saving
companySchema.pre('save', async function(next) {
  if (this.isModified('packageId') || this.isNew) {
    const package = await Package.findById(this.packageId);
    if (package) {
      const startDate = this.packageStartDate || new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + package.durationMonths);
      this.packageEndDate = endDate;
    }
  }
  next();
});

// Add text index for search functionality
companySchema.index({ name: 'text', email: 'text', 'address.city': 'text' });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;