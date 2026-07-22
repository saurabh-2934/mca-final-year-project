const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const addProductInCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const { offerOnBank } = req.body;
    // Find product
    const product = await Product.findById(productId);
    console.log(offerOnBank);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: id });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = new Cart({
        user: id,
        items: [
          {
            product: productId,
            quantity: 1,
            offerOnBank,
          },
        ],
      });

      await cart.save();

      return res.status(201).json({
        success: true,
        message: "Product added to cart",
      });
    }

    // Find product in cart
    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );

    if (cartItem) {
      // Check stock
      if (cartItem.quantity >= product.stock) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} item(s) available in stock.`,
        });
      }

      // Increase quantity
      cartItem.quantity += 1;
    } else {
      // Add new product
      cart.items.push({
        product: productId,
        quantity: 1,
        offerOnBank,
      });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const checkForProduct = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: id });

    if (!cart) {
      return res.status(200).json({
        success: true,
        isInCart: false,
      });
    }

    const isInCart = cart.items.some(
      (item) => item.product.toString() === productId,
    );

    return res.status(200).json({
      success: true,
      isInCart,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCarts = async (req, res) => {
  try {
    const { id } = req.user;

    const cart = await Cart.findOne({ user: id }).populate("items.product");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    if (cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        items: [],
      });
    }

    return res.status(200).json({
      success: true,
      items: cart.items,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteCartsProduct = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;

    const userCart = await Cart.findOne({ user: id });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    userCart.items = userCart.items.filter(
      (item) => item._id.toString() !== productId,
    );

    await userCart.save();

    res.status(200).json({
      message: "Product removed from cart successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOneAndUpdate(
      {
        user: id,
        "items._id": productId,
      },
      {
        $set: {
          "items.$.quantity": quantity,
        },
      },
      { new: true },
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart or product not found" });
    }

    res.status(200).json({
      message: "Quantity updated successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProductInCart,
  checkForProduct,
  getCarts,
  deleteCartsProduct,
  updateQuantity,
};
