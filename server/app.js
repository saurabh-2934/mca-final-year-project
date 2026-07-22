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

const allowedOrigins = [
  "http://localhost:3000",
  "https://mca-final-year-project.onrender.com",
];

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

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
