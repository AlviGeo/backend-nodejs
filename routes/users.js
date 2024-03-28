const express = require('express');

const router = express.Router();
const userController = require('../controllers/auth');
const verifyToken = require('../middleware/token');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('masuk');
});

router.post('/register', userController.register);

router.post('/login', userController.login);

router.post('/logout', verifyToken, userController.logout);

router.post('/reset-password', verifyToken, userController.resetPassword);

module.exports = router;
