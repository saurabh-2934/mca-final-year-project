const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
require("dotenv").config({
  path: "../.env",
});

const connectDB = require("../config/db");

async function createAdmin() {
  try {
    connectDB();

    const adminExists = await User.findOne({
      email: "babitadeo469@gmail.com",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hash = await bcrypt.hash(process.env.ADMIN_PASS, 10);

    await User.create({
      email: "babitadeo469@gmail.com",
      role: "admin",
    });

    console.log("Admin Created Successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await mongoose.connection.close();
  }
}

createAdmin();
