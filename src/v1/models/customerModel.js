const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      maxLength: [20, 'Customer name cannot exceed 20 characters'],
      minLength: [2, 'Customer name must be at least 2 characters'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
