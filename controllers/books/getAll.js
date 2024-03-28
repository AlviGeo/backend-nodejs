// Import Model
const db = require("../../models");
const Book = db.Book;

const getAll = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: [
        "id",
        "book_title",
        "book_author",
        "book_description",
        "book_year",
      ],
    });
    if (!books) {
      return res
        .status(404)
        .json({ status: "error", message: "Book not found" });
    }

    return res.json({ status: "success", data: books });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

module.exports = getAll;
