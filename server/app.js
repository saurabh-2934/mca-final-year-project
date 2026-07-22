const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const addressRoute = require("./routes/address.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "celadon-rabanadas-24cfb0.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("Origin:", origin);

      // Allow requests from Postman or server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);
      return callback(null, false);
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

module.exports = app;
