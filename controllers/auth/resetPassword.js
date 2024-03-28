const db = require("../../models");
const User = db.User;

// Fastest Validator
const Validator = require("fastest-validator");
const v = new Validator();
const userValidator = require("./validator/user.validator");

// Bcrypt Password
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { password, new_password } = req.body;

    // Validate Change Pass Requirement
    const validateResetPass = v.validate(
      req.body,
      userValidator.reset_password
    );

    // Error Message if Validate Failed
    if (validateResetPass.length) {
      return res.status(400).json({
        status: "error",
        message: validateResetPass,
      });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(400).json({
        status: "error",
        message: "Wrong Password!",
      });
    }

    const passHash = await bcrypt.hash(new_password, 10);

    await User.update(
      { password: passHash },
      {
        where: { id: user.id },
      }
    );

    return res.json({
      status: "success",
      message: "Your password has been updated.",
    });
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

module.exports = resetPassword;
