// Import Model
const db = require('../../models');

const { Book } = db;

const getById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findByPk(bookId, {
      attributes: [
        'id',
        'bookTitle',
        'bookAuthor',
        'bookDescription',
        'bookYear',
      ],
    });

    if (!book) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Book not found' });
    }

    return res.json({
      status: 'success',
      message: 'Book Successfully retrieved!',
      data: book,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = getById;
