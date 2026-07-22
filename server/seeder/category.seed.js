const mongoose = require("mongoose");
require("dotenv").config({
  path: "../.env",
});

const Category = require("../models/category.model");
const categories = [
  {
    name: "For You",
    image: "/category/for_you.png",
  },
  {
    name: "Mobiles",
    image: "/category/mobiles.png",
  },
  {
    name: "Laptop",
    image: "/category/laptop.png",
  },
  {
    name: "TV",
    image: "/category/tv.png",
  },
  {
    name: "Smartwatch",
    image: "/category/smartwatch.png",
  },
  {
    name: "Home Appliances",
    image: "/category/home_appliances.png",
  },
  {
    name: "Fashion",
    image: "/category/fashion.png",
  },
  {
    name: "Beauty",
    image: "/category/beauty.png",
  },
  {
    name: "Books",
    image: "/category/books.png",
  },
  {
    name: "Sports",
    image: "/category/sports.png",
  },
  {
    name: "Toys",
    image: "/category/toys.png",
  },
  {
    name: "Furniture",
    image: "/category/furniture.png",
  },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Category.deleteMany();

    await Category.insertMany(categories);

    console.log("✅ Categories Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedCategories();
