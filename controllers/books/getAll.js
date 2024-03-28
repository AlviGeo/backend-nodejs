// Import Model
const db = require('../../models');

const Book = db;

const getAll = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: [
        'id',
        'bookTitle',
        'bookAuthor',
        'bookDescription',
        'bookYear',
      ],
    });
    if (!books) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Book not found' });
    }

    return res.json({ status: 'success', data: books });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = getAll;
