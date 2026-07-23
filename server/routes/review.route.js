const express = require("express");
const router = express.Router();

const {
  createReview,
  deleteReview,
  getProductReviews,
} = require("../controllers/review.controller");

const authorize = require("../middleware/checkAuth");

router.post("/create", authorize, createReview);

router.delete("/delete/:id", authorize, deleteReview);

router.get("/product/:productId", getProductReviews);

module.exports = router;
