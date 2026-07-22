const crypto = require("crypto");
const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Address = require("../models/address.model");
const razorpay = require("../utils/razorpay");

const createOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { cartId } = req.params;

    const cart = await Cart.findOne({ user: id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        message: "Cart is empty",
      });
    }

    let itemsForOrder = [];

    // Buy single product
    if (cartId) {
      const item = cart.items.find((item) => item._id.toString() === cartId);

      if (!item) {
        return res.status(404).json({
          message: "Product not found in cart",
        });
      }

      itemsForOrder.push(item);
    }
    // Buy entire cart
    else {
      itemsForOrder = cart.items;
    }

    let totalAmount = 0;

    itemsForOrder.forEach((item) => {
      const sellingPrice = Math.round(
        item.product.price -
          (item.product.price * item.product.discountPercentage) / 100,
      );

      const bankDiscount = Math.round(
        (item.product.price * item.offerOnBank) / 100,
      );

      totalAmount += (sellingPrice - bankDiscount) * item.quantity;
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: cartId ? `cart_${cartId}` : `cart_all_${id}`,
    });

    res.status(200).json({
      key: process.env.RAZORPAY_KEY_ID,
      orderId: razorpayOrder.id,
      razorpayOrder,
      amount: totalAmount,
      cartId: cartId || null,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { id } = req.user;
    const { cartId } = req.params;

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Verify Razorpay Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    // Get User Cart
    const cart = await Cart.findOne({ user: id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({
        message: "Cart is empty",
      });
    }

    // Get Default Address
    const address = await Address.findOne({
      user: id,
      isDefault: true,
    });

    if (!address) {
      return res.status(404).json({
        message: "Default address not found",
      });
    }

    let itemsForOrder = [];

    // Single Product
    if (cartId) {
      const item = cart.items.find((item) => item._id.toString() === cartId);

      if (!item) {
        return res.status(404).json({
          message: "Product not found in cart",
        });
      }

      itemsForOrder.push(item);
    }
    // Entire Cart
    else {
      itemsForOrder = cart.items;
    }

    let totalAmount = 0;

    // Calculate Total & Check Stock
    for (const item of itemsForOrder) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `${item.product.name} is out of stock`,
        });
      }

      const sellingPrice = Math.round(
        item.product.price -
          (item.product.price * item.product.discountPercentage) / 100,
      );

      const bankDiscount = Math.round(
        (item.product.price * item.offerOnBank) / 100,
      );

      totalAmount += (sellingPrice - bankDiscount) * item.quantity;
    }

    // Create Order
    const order = await Order.create({
      user: id,

      products: itemsForOrder.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        offerOnBank: item.offerOnBank,
      })),

      totalAmount,

      deliveryCharge: 100,

      paymentMethod: "Razorpay",

      paymentStatus: "Paid",

      orderStatus: "Pending",

      shippingAddress: address._id,

      razorpayOrderId: razorpay_order_id,

      razorpayPaymentId: razorpay_payment_id,

      expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    });

    // Reduce Stock
    for (const item of itemsForOrder) {
      item.product.stock -= item.quantity;
      await item.product.save();
    }

    // Remove Ordered Product(s) From Cart
    if (cartId) {
      cart.items = cart.items.filter((item) => item._id.toString() !== cartId);
    } else {
      cart.items = [];
    }

    await cart.save();

    return res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { id } = req.user;

    const orders = await Order.find({ user: id })
      .populate({
        path: "products.product",
        select: "name price images discountPercentage brand rating",
      })
      .populate({
        path: "shippingAddress",
        select:
          "fullName phone area locality city state pincode landmark addressType",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { orderId } = req.params;

    const order = await Order.findOne({
      _id: orderId,
      user: id,
    }).populate("products.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      order.orderStatus === "Delivered" ||
      order.orderStatus === "Cancelled"
    ) {
      return res.status(400).json({
        message: `Order is already ${order.orderStatus}`,
      });
    }

    // Restore stock
    for (const item of order.products) {
      item.product.stock += item.quantity;
      await item.product.save();
    }

    order.orderStatus = "Cancelled";
    order.cancelledAt = new Date();
    order.cancelReason = req.body.reason || "Cancelled by customer";

    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getAllOrders,
  cancelOrder,
};
