const express = require("express");
const router = express.Router();

const { addressValidationRules } = require("../validators/address.validator");

const authorize = require("../middleware/checkAuth");
const validate = require("../middleware/validate");

const {
  addAddress,
  setLiveLocation,
  getLocation,
  getAddresses,
  deleteAddress,
  updateIsDefault,
  getDefaultAddress,
} = require("../controllers/address.controller");

router.put("/set-location", authorize, setLiveLocation);
router.get("/get-location", authorize, getLocation);
router.post(
  "/add-address",
  addressValidationRules,
  validate,
  authorize,
  addAddress,
);
router.get("/get-addresses", authorize, getAddresses);
router.delete("/delete-address/:id", authorize, deleteAddress);
router.patch("/update/:addressId", authorize, updateIsDefault);
router.get("/get-current-address", authorize, getDefaultAddress);

module.exports = router;
