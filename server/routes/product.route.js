const express = require("express");
const router = express.Router();

const authorize = require("../middleware/checkAuth");

const {
  getAllProducts,
  getProductById,
  getForYouProducts,
  getBrandsByCategory,
} = require("../controllers/products.controller");

router.get("/products", authorize, getAllProducts);
router.get("/products/for-you", authorize, getForYouProducts);
router.get("/product/:id", authorize, getProductById);
router.get("/product/brand/:category", authorize, getBrandsByCategory);

module.exports = router;
