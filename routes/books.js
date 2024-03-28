const express = require('express');

const router = express.Router();

const bookController = require('../controllers/books');
const verifyToken = require('../middleware/token');

/* GET Book by ID */
router.get('/:bookId', verifyToken, bookController.getById);

/* GET All Books */
router.get('/', verifyToken, bookController.getAll);

/* Add New Book */
router.post('/', verifyToken, bookController.create);

/* Update Book by ID */
router.put('/:bookId', verifyToken, bookController.edit);

/* Delete Book by ID */
router.delete('/:bookId', verifyToken, bookController.deleteBook);

module.exports = router;
