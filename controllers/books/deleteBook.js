// Import Model
const db = require('../../models');

const { Book } = db;

const deleteBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const findBook = await Book.findOne({
      where: {
        id: bookId,
      },
    });
    if (!findBook) {
      return res.status(400).json({
        status: 'error',
        message: 'Book Not Found!',
      });
    }

    const destroyBook = await Book.destroy({ where: { id: bookId } });
    return res.status(200).json({
      status: 'success',
      message: 'Book Successfully Deleted!',
      data: destroyBook,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

module.exports = deleteBook;
