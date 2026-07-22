const Category = require("../models/category.model");

const listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  listCategories,
};
