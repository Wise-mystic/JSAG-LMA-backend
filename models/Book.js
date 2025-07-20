const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1000, 'Year must be at least 1000'],
    max: [new Date().getFullYear(), 'Year cannot be in the future']
  },
  isbn: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  isBorrowed: {
    type: Boolean,
    default: false
  },
  borrowedBy: {
    name: { type: String, trim: true, default: '' },
    contact: { type: String, trim: true, default: '' }
  },
  borrowedDate: {
    type: Date
  },
  expectedReturnedDate: {
    type: Date
  },
  removed: {
    type: Boolean,
    default: false
  },
  removalReason: {
    type: String,
    trim: true
  },
  removedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  removedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
bookSchema.index({ title: 1, author: 1 });
bookSchema.index({ removed: 1 });

module.exports = mongoose.model('Book', bookSchema); 