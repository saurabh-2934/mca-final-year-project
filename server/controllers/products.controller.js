const Product = require("../models/product.model");
const Category = require("../models/category.model");

const getAllProducts = async (req, res) => {
  try {
    const {
      search = "",
      minprice,
      maxprice,
      category,
      rating,
      brand,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    const filter = {};

    // Search by product name or description
    if (search.trim()) {
      const keywords = search.trim().split(/\s+/);

      filter.$or = [
        ...keywords.map((word) => ({
          name: {
            $regex: word,
            $options: "i",
          },
        })),
        ...keywords.map((word) => ({
          description: {
            $regex: word,
            $options: "i",
          },
        })),
      ];
    }

    // Brand Filter
    if (brand) {
      filter.brand = {
        $regex: brand,
        $options: "i",
      };
    }

    // Category Filter
    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    // Price Filter
    if (minprice || maxprice) {
      filter.price = {};

      if (minprice) {
        filter.price.$gte = Number(minprice);
      }

      if (maxprice) {
        filter.price.$lte = Number(maxprice);
      }
    }

    // Rating Filter
    if (rating) {
      filter.rating = {
        $gte: Number(rating),
      };
    }

    const products = await Product.find(filter)
      .sort({
        [sort]: order === "asc" ? 1 : -1,
      })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(400).json({ message: "product not found." });
    }

    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: "something went wrong." });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { role } = req;
    const { id } = req.params;

    // Check Authorization
    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this product.",
      });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
      product,
    });
  } catch (err) {
    return res.status(500).json({ message: "something went wrong." });
  }
};

const getForYouProducts = async (req, res) => {
  try {
    const [mobilesForYou, homeApplianceForYou, laptopForYou, smartwatchForYou] =
      await Promise.all([
        Product.find({ category: "Mobiles" }).limit(5),
        Product.find({ category: "Home Appliances" }).limit(5),
        Product.find({ category: "Laptop" }).limit(5),
        Product.find({ category: "Smartwatch" }).limit(5),
      ]);

    res.status(200).json({
      mobilesForYou,
      homeApplianceForYou,
      laptopForYou,
      smartwatchForYou,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getBrandsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const brands = await Product.distinct("brand", { category });

    return res.status(200).json(brands);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getForYouProducts,
  getBrandsByCategory,
};
