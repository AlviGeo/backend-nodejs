// Import Model
const db = require("../../models");
const Book = db.Book;

const getById = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findByPk(bookId, {
      attributes: [
        "id",
        "book_title",
        "book_author",
        "book_description",
        "book_year",
      ],
    });
    if (!book) {
      return res
        .status(404)
        .json({ status: "error", message: "Book not found" });
    }

    return res.json({
      status: "success",
      message: "Book Successfully retrieved!",
      data: book,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

module.exports = getById;
