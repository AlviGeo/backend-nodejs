// Import Model
const db = require("../../models");
const Book = db.Book;

const create = async (req, res) => {
  const { id } = req.user;
  const { book_title, book_author, book_description, book_year } = req.body;

  try {
    const payload = {
      book_title,
      book_author,
      book_description,
      book_year,
      user_id: id,
    };

    // Insert User to DB
    const insertBook = await Book.create(payload);

    if (!insertBook) {
      return res.status(400).json({
        status: "error",
        message: "Failed to create book",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Successfully Created!",
      data: insertBook,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = create;
