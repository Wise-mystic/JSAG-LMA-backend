const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBook,
  addBook,
  toggleBorrowStatus,
  removeBook,
  updateBook
} = require('../controllers/bookController');
const auth = require('../middleware/auth');

// All book routes are protected
router.use(auth);

// GET /api/books - Get all books
router.get('/', getAllBooks);

// GET /api/books/:id - Get single book
router.get('/:id', getBook);

// POST /api/books - Add new book
router.post('/', addBook);

// PUT /api/books/:id - Update book
router.put('/:id', updateBook);

// PATCH /api/books/:id/toggle-borrow - Toggle borrow status
router.patch('/:id/toggle-borrow', toggleBorrowStatus);

// PATCH /api/books/:id/remove - Remove book (soft delete)
router.patch('/:id/remove', removeBook);

module.exports = router; 