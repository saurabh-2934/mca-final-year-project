const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const addressRoute = require("./routes/address.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");
const reviewRoute = require("./routes/review.route");

app.use(express.json());

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"].filter(
  Boolean,
);

console.log("Allowed Origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin.trim())) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/", productRoute);
app.use("/address", addressRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/review", reviewRoute);

module.exports = app;
