const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");

const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const categoryRoute = require("./routes/category.route");
const addresRoute = require("./routes/address.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/", productRoute);
app.use("/address", addresRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

module.exports = app;
