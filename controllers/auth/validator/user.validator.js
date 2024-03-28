const Validator = require("fastest-validator");

/*validator for register*/
const register = {
  email: { type: "email", empty: false },
  password: { type: "string", min: 6, max: 25, empty: false },
};

/*validator for login*/
const login = {
  email: { type: "email", empty: false },
  password: { type: "string", min: 6, empty: false },
};

/*validator for reset password*/
const reset_password = {
  password: { type: "string", min: 6, optional: false },
  new_password: { type: "equal", field: "password", optional: false },
};

module.exports = {
  register,
  login,
  reset_password,
};
