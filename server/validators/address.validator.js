const { body } = require("express-validator");

const addressValidationRules = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Full name must be between 3 and 50 characters"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid phone number"),

  body("pincode")
    .notEmpty()
    .withMessage("Pincode is required")
    .matches(/^\d{6}$/)
    .withMessage("Invalid pincode"),

  body("locality")
    .trim()
    .notEmpty()
    .withMessage("Locality is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Locality must be between 2 and 100 characters"),

  body("area")
    .trim()
    .notEmpty()
    .withMessage("Area is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Area must be between 2 and 200 characters"),

  body("landmark")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Landmark cannot exceed 100 characters"),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("City must be between 2 and 50 characters"),

  body("state")
    .trim()
    .notEmpty()
    .withMessage("State is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("State must be between 2 and 50 characters"),

  body("alternateNumber")
    .optional({ checkFalsy: true })
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid alternate phone number"),

  body("country")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Invalid country"),

  body("addressType")
    .optional()
    .isIn(["Home", "Work", "Other"])
    .withMessage("Address type must be Home, Work, or Other"),

  body("isDefault")
    .optional()
    .isBoolean()
    .withMessage("isDefault must be a boolean"),
];

module.exports = {
  addressValidationRules,
};
