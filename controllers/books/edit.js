// Import Model
const db = require("../../models");
const Book = db.Book;

const edit = async (req, res) => {
  const { id } = req.user;
  const { bookId } = req.params;
  const { book_title, book_author, book_description, book_year } = req.body;

  try {
    const payload = {
      book_title,
      book_author,
      book_description,
      book_year,
      user_id: id,
    };

    const findBook = await Book.findOne({
      where: {
        id: bookId,
      },
    });
    if (!findBook) {
      return res.status(400).json({
        status: "error",
        message: "Book Not Found!",
      });
    }

    const updateBook = await Book.update(payload, {
      where: {
        id: bookId,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Book Successfully Updated!",
      data: updateBook,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = edit;
