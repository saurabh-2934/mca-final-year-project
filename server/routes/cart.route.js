const express = require("express");
const router = express.Router();

const authorize = require("../middleware/checkAuth");

const {
  addProductInCart,
  checkForProduct,
  getCarts,
  deleteCartsProduct,
  updateQuantity,
} = require("../controllers/cart.controller");

router.get("/get-product/:productId", authorize, checkForProduct);
router.post("/add-product/:productId", authorize, addProductInCart);
router.get("/get-carts", authorize, getCarts);
router.delete("/remove/:productId", authorize, deleteCartsProduct);
router.patch("/update-quantity/:productId", authorize, updateQuantity);

module.exports = router;
