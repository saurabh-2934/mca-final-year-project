const mongoose = require("mongoose");
const Review = require("../models/review.model");
const Product = require("../models/product.model");

// ====================== CREATE REVIEW ======================

const createReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const user = req.user.id;

    if (!product || !rating) {
      return res.status(400).json({
        success: false,
        message: "Product and rating are required.",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    const productExists = await Product.findById(product);

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const alreadyReviewed = await Review.findOne({
      user,
      product,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product.",
      });
    }

    const review = await Review.create({
      user,
      product,
      rating,
      comment,
    });

    const reviewStats = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(product),
        },
      },
      {
        $group: {
          _id: "$product",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    await Product.findByIdAndUpdate(
      product,
      {
        averageRating: Number(reviewStats[0].averageRating.toFixed(1)),
        totalReviews: reviewStats[0].totalReviews,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(201).json({
      success: true,
      message: "Review added successfully.",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================== DELETE REVIEW ======================

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user.id;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    if (review.user.toString() !== user) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this review.",
      });
    }

    const productId = review.product;

    await Review.findByIdAndDelete(id);

    const reviewStats = await Review.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: "$product",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    if (reviewStats.length > 0) {
      await Product.findByIdAndUpdate(
        productId,
        {
          averageRating: Number(reviewStats[0].averageRating.toFixed(1)),
          totalReviews: reviewStats[0].totalReviews,
        },
        {
          new: true,
          runValidators: true,
        },
      );
    } else {
      await Product.findByIdAndUpdate(
        productId,
        {
          averageRating: 0,
          totalReviews: 0,
        },
        {
          new: true,
          runValidators: true,
        },
      );
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================== GET PRODUCT REVIEWS ======================

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).select(
      "averageRating totalReviews",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const reviews = await Review.find({
      product: productId,
    })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      averageRating: product.averageRating,
      totalReviews: product.totalReviews,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  deleteReview,
  getProductReviews,
};
