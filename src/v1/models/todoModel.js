const mongoose = require('mongoose');
const slugify = require('slugify');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      maxLength: [50, 'Title cannot exceed 50 characters'],
      minLength: [5, 'Title must be at least 5 characters'],
    },
    customer: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      maxLength: [20, 'Customer name cannot exceed 20 characters'],
      minLength: [2, 'Customer name must be at least 2 characters'],
    },
    description: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      enum: ['Open', 'Closed', 'Completed', 'Deleted'],
    },
    created: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
