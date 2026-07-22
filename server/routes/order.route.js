const express = require("express");
const router = express.Router();

const authorize = require("../middleware/checkAuth");

const {
  createOrder,
  verifyPayment,
  getAllOrders,
  cancelOrder,
} = require("../controllers/Order.controller");

router.post("/buy-product/:cartId", authorize, createOrder);
router.post("/verify-payment/:cartId", authorize, verifyPayment);
router.get("/get-orders", authorize, getAllOrders);
router.patch("/cancel/:orderId", authorize, cancelOrder);
router.post("/buy-product", authorize, createOrder);
router.post("/verify-payment", authorize, verifyPayment);

module.exports = router;
