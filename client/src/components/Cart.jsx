import Header from "./Header.home";
import Footer from "./Footer";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axiosInstance from "../utils/axiosInstance";
import { IoIosArrowRoundDown } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoFlashOutline } from "react-icons/io5";

import SmallLoader from "./SmallLoader";
import Rating from "./Rating";
import formatDateWithDay from "../utils/getDate";
import { FiInfo } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const today = new Date();

const fiveDaysLater = new Date(today);
fiveDaysLater.setDate(today.getDate() + 5);

function Cart() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [offerDiscout, setOfferDiscount] = useState(0);
  const { setCartCount, refreshCart } = useCart();
  const [address, setAddress] = useState({});
  const navigate = useNavigate();

  const getCarts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/cart/get-carts");

      let grandTotal = 0;

      response.data.items.forEach((item) => {
        const discountedPrice = Math.round(
          item.product.price -
            (item.product.price * item.product.discountPercentage) / 100,
        );

        grandTotal += discountedPrice * item.quantity;
      });

      const discount = response.data.items.reduce((total, item) => {
        return (
          total +
          Math.round((item.product.price * item.offerOnBank) / 100) *
            item.quantity
        );
      }, 0);

      setOfferDiscount(discount);
      setTotalAmount(grandTotal);

      setCarts(response.data.items);
      setCartCount(response.data.items.length);
    } catch (err) {
      console.log(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, [setCartCount]);

  useEffect(() => {
    getCarts();
    setAddress(JSON.parse(localStorage.getItem("current_address")));
  }, [getCarts]);

  const onClickBuyThisProduct = async (id) => {
    try {
      const response = await axiosInstance.post(`/order/buy-product/${id}`);

      const options = {
        key: response.data.key,

        amount: response.data.razorpayOrder.amount,

        currency: "INR",

        order_id: response.data.razorpayOrder.id,

        name: "Quickart",

        description: "E-commerce Application",

        handler: async function (payment) {
          try {
            const verifyData = await axiosInstance.post(
              `/order/verify-payment/${id}`,
              {
                razorpay_order_id: payment.razorpay_order_id,
                razorpay_payment_id: payment.razorpay_payment_id,
                razorpay_signature: payment.razorpay_signature,
              },
            );

            await getCarts();

            setTimeout(() => {
              navigate("/payment-success", {
                state: {
                  orderId: verifyData.data.order._id,
                  expectedDelivery: verifyData.data.order.expectedDelivery,
                },
              });
              const expiresAt = Date.now() + 1 * 60 * 1000; // 5 minutes

              sessionStorage.setItem("paymentSuccessExpiry", expiresAt);
            }, 100);
          } catch (err) {
            console.log(err.response?.data?.message);
          }
        },

        // Add it here
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
            // You can show a toast here if you want
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      //Add payment failed listener here
      razorpay.on("payment.failed", function (response) {
        // console.log("Payment Failed");

        // console.log(response.error.code);
        // console.log(response.error.description);
        // console.log(response.error.reason);

        alert("Payment failed. Please try again.");
      });

      razorpay.open();
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const onClickPlaceOrder = async () => {
    try {
      const response = await axiosInstance.post(`/order/buy-product`);

      const options = {
        key: response.data.key,

        amount: response.data.razorpayOrder.amount,

        currency: "INR",

        order_id: response.data.razorpayOrder.id,

        name: "Quickart",

        description: "E-commerce Application",

        handler: async function (payment) {
          try {
            const verifyData = await axiosInstance.post(
              `/order/verify-payment`,
              {
                razorpay_order_id: payment.razorpay_order_id,
                razorpay_payment_id: payment.razorpay_payment_id,
                razorpay_signature: payment.razorpay_signature,
              },
            );

            await getCarts();

            setTimeout(() => {
              navigate("/payment-success", {
                state: {
                  orderId: verifyData.data.order._id,
                  expectedDelivery: verifyData.data.order.expectedDelivery,
                },
              });
              const expiresAt = Date.now() + 1 * 60 * 1000; // 5 minutes

              sessionStorage.setItem("paymentSuccessExpiry", expiresAt);
            }, 100);
          } catch (err) {
            console.log(err.response?.data?.message);
          }
        },

        // Add it here
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
            // You can show a toast here if you want
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      //Add payment failed listener here
      razorpay.on("payment.failed", function (response) {
        // console.log("Payment Failed");

        // console.log(response.error.code);
        // console.log(response.error.description);
        // console.log(response.error.reason);

        alert("Payment failed. Please try again.");
      });

      razorpay.open();
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const onClickRemoveProduct = async (id) => {
    try {
      setLoading(true);
      await axiosInstance.delete(`/cart/remove/${id}`);
      getCarts();
      await refreshCart();
    } catch (err) {
      console.log(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const onClickQuantity = async (e, id) => {
    try {
      await axiosInstance.patch(`/cart/update-quantity/${id}`, {
        quantity: e.target.value,
      });
      getCarts();
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      {loading && <SmallLoader />}
      {carts.length === 0 ? (
        <main className="px-4 md:px-32 pt-44 bg-zinc-100 lg:h-[calc(100vh-190px)]">
          <div className="w-full bg-white flex flex-col justify-center items-center py-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRouh2oXnZBGqEuauS7l3PZ_JB_BYDlz0Pds9fv54zYBw&s=10"
              alt="empty_cart"
              className="w-[150px] h-[150px] mr-8 mb-4"
            />
            <h2 className="text-zinc-800 font-poppins font-bold text-2xl mb-4">
              Your cart is Empty
            </h2>
            <Link to="/">
              <button className="bg-blue-700 text-lg font-bold font-poppins text-white px-12 py-2 rounded-md mb-4">
                Shop now
              </button>
            </Link>
          </div>
        </main>
      ) : (
        <main className="px-3 md:px-32 pt-44 bg-zinc-100 flex flex-col lg:flex-row gap-4 lg:gap-6 lg:h-[calc(100vh-10px)]">
          <div className="w-full lg:flex-1 lg:overflow-y-auto lg:pr-2 scrollbar-hide">
            {address ? (
              <div className="bg-white p-4 shadow-sm w-full mb-4 text-left">
                <h2 className="text-md text-zinc-800 font-bold mb-2">
                  Delivery to: {address.fullName.toUpperCase()} {address.phone}
                </h2>

                <p className="text-zinc-500 text-sm">
                  {address.area}, {address.locality}, {address.city},{" "}
                  {address.pincode}
                </p>
              </div>
            ) : (
              <div className="bg-white p-4  shadow-sm w-1/3 lg:w-full">
                <p className="text-red-500 font-semibold">
                  No delivery address selected.
                </p>

                <Link to="/user/add_new_address">
                  <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                    Add Address
                  </button>
                </Link>
              </div>
            )}
            {carts.map((item) => (
              <div key={item._id} className="bg-white shadow-sm mb-4">
                <div className="flex gap-3 p-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 md:w-28 md:h-28 object-contain flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <h2 className="truncate text-sm md:text-base font-semibold text-zinc-800">
                      {item.product.name}
                    </h2>
                    <Rating rating={item.product.rating} />
                    <div className="flex items-center flex-wrap gap-2">
                      <p className="text-green-600 text-sm md:text-lg font-semibold flex items-center w-fit mr-2">
                        <IoIosArrowRoundDown className="font-bold" />
                        {item.product.discountPercentage}
                      </p>
                      <p className="mr-2 text-zinc-400 font-semibold line-through">
                        ₹{item.product.price.toLocaleString("en-IN")}
                      </p>
                      <p className="text-zinc-900 font-semibold">
                        ₹
                        {Math.round(
                          item.product.price -
                            (item.product.price *
                              item.product.discountPercentage) /
                              100,
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="relative border-[1px] border-gray-300 w-20 flex items-center px-2 py-1 ">
                      <select
                        key={item._id}
                        value={item.quantity}
                        onChange={(e) => onClickQuantity(e, item._id)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>

                      <p className="text-sm mr-2">Qty:</p>
                      <span className="text-sm">{item.quantity}</span>

                      <FaCaretDown className="ml-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <p className="border-b-[1px] border-gray-300 text-left px-4 pb-4 text-sm mt-2">
                  Delivery by {formatDateWithDay(fiveDaysLater)}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => onClickRemoveProduct(item._id)}
                    className="flex justify-center font-bold text-zinc-800 border-r-[1px] border-gray-300 items-center w-full py-2">
                    <RiDeleteBin6Line className="mr-2" />
                    Remove
                  </button>
                  <button
                    onClick={() => onClickBuyThisProduct(item._id)}
                    className="flex justify-center font-bold text-zinc-800 items-center w-full py-2">
                    <IoFlashOutline className="mr-2" />
                    Buy this now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-[380px] lg:sticky lg:top-44 self-start">
            <h2 className="text-zinc-800 text-base font-bold text-left mb-4">
              Price Details
            </h2>
            <div className="bg-white w-full px-4 py-4 shadow-md mb-4">
              <p className="text-gray-700 text-sm flex items-center justify-between mb-4">
                MRP (Incl, of all taxes){" "}
                <span className="text-zinc-800">
                  ₹{totalAmount.toLocaleString("en-IN")}
                </span>
              </p>
              <p className="flex justify-between items-center text-gray-700 text-sm mb-4">
                Fees <span className="text-zinc-800">440</span>
              </p>
              <p className="flex justify-between items-center text-gray-700 text-sm border-b-[1px] border-gray-500 pb-4 mb-4">
                Discounts{" "}
                <span className="text-green-600 ">
                  ₹{offerDiscout.toLocaleString("en-IN")}
                </span>
              </p>
              <p className="flex justify-between items-center text-gray-700 text-sm mb-4 font-merriweather">
                Total Amount{" "}
                <span className="text-green-600 text-sm">
                  ₹
                  {(totalAmount - (offerDiscout + 440)).toLocaleString("en-IN")}
                </span>
              </p>

              <p className="px-8 py-2 bg-green-100 text-green-600 text-sm rounded-lg">
                You will save ₹{(offerDiscout + 440).toLocaleString("en-IN")} on
                this order
              </p>
            </div>
            <div className="flex items-center justify-center px-4 text-center mb-4">
              <img
                src="https://rukminim2.flixcart.com/www/52/64/promos/13/02/2019/9b179a8a-a0e2-497b-bd44-20aa733dc0ec.png?q=60"
                alt="badge"
                className="w-[30px] h-[35px]"
              />
              <h2 className="text-gray-500 text-sm font-bold">
                Safe and secure payments. Easy return with 100% Authentic
                product.
              </h2>
            </div>
            <div className="bg-white px-4 py-2 flex items-center justify-between mb-4 shadow-md">
              <div>
                <p className="text-base text-left text-zinc-500 line-through">
                  {totalAmount.toLocaleString("en-IN")}
                </p>
                <p className="flex items-center text-lg text-zinc-800 font-merriweather">
                  {(totalAmount - (offerDiscout + 440)).toLocaleString("en-IN")}
                  <span className="text-gray-600 ml-2 text-base">
                    <FiInfo />
                  </span>
                </p>
              </div>
              <button
                onClick={onClickPlaceOrder}
                className="bg-yellow-500 px-8 py-3 text-zinc-900 text-sm font-merriweather rounded-md">
                Place Order
              </button>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}

export default Cart;
