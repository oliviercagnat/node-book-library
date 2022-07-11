// Set up the routes for our app
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Import the books in the / route.
router.get('/', async (req, res) => {
    let books;
    try {
      books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec();
    } catch {
      books = [];
    }
    res.render('index', { books: books });
  })

// We export the router so the app has access to the routes
module.exports = router;