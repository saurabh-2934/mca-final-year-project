const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config;

const app = express();

const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const addressRoute = require("./routes/address.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");

app.use(express.json());

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Origin received:", JSON.stringify(origin));
      console.log("Allowed:", [...allowedOrigins]);

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.has(origin.trim())) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/", productRoute);
app.use("/address", addressRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

module.exports = app;
