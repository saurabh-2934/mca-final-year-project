const { body } = require("express-validator");

const createUserValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters long"),
  body("phone").isMobilePhone().withMessage("phone is required"),
];

const loginUserValidator = [
  body("email").isEmail().withMessage("email is required"),
];
module.exports = {
  createUserValidator,
  loginUserValidator,
};
