const db = require('../../models');

const { User } = db;

const logout = async (req, res) => {
  try {
    // Check if user ID exists in the database
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    // Remove token from user record
    const removeAccessToken = await User.update(
      { access_token: null },
      {
        where: { id: user.id },
      },
    );
    if (!removeAccessToken) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Token failed to remove' });
    }

    return res.json({
      status: 'success',
      message: 'User successfully logged out ',
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  }
};

module.exports = logout;
