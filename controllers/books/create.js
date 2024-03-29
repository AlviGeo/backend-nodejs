// Import Model
const db = require('../../models');

const { Book } = db;

const create = async (req, res) => {
  const { id } = req.user;
  const {
    bookTitle, bookAuthor, bookDescription, bookYear,
  } = req.body;

  try {
    const payload = {
      bookTitle,
      bookAuthor,
      bookDescription,
      bookYear,
      userId: id,
    };

    // Insert User to DB
    const insertBook = await Book.create(payload);

    if (!insertBook) {
      return res.status(400).json({
        status: 'error',
        message: 'Failed to create book',
      });
    }

    return res.status(201).json({
      status: 'success',
      message: 'Successfully Created!',
      data: insertBook,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

module.exports = create;
