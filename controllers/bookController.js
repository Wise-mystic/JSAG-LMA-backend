const Book = require('../models/Book');

// @desc    Get all books (not removed)
// @route   GET /api/books
// @access  Private
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ removed: false }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Get all books error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Private
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.removed) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Get book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add a new book
// @route   POST /api/books
// @access  Private
const addBook = async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;

    // Validate required fields
    if (!title || !author || !genre || !year) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, author, genre, and year'
      });
    }

    const book = await Book.create({
      title,
      author,
      genre,
      year,
      isBorrowed: false
    });

    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: book
    });
  } catch (error) {
    console.error('Add book error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Toggle book borrow status
// @route   PATCH /api/books/:id/toggle-borrow
// @access  Private
const toggleBorrowStatus = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.removed) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    book.isBorrowed = !book.isBorrowed;
    await book.save();

    res.status(200).json({
      success: true,
      message: `Book ${book.isBorrowed ? 'marked as borrowed' : 'marked as available'}`,
      data: book
    });
  } catch (error) {
    console.error('Toggle borrow status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Remove a book (soft delete)
// @route   PATCH /api/books/:id/remove
// @access  Private
const removeBook = async (req, res) => {
  try {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Removal reason is required'
      });
    }

    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.removed) {
      return res.status(400).json({
        success: false,
        message: 'Book is already removed'
      });
    }

    book.removed = true;
    book.removalReason = reason;
    await book.save();

    res.status(200).json({
      success: true,
      message: 'Book removed successfully',
      data: book
    });
  } catch (error) {
    console.error('Remove book error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = async (req, res) => {
  try {
    const { title, author, genre, year } = req.body;

    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    if (book.removed) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    // Update fields if provided
    if (title) book.title = title;
    if (author) book.author = author;
    if (genre) book.genre = genre;
    if (year) book.year = year;

    await book.save();

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });
  } catch (error) {
    console.error('Update book error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  addBook,
  toggleBorrowStatus,
  removeBook,
  updateBook
}; 