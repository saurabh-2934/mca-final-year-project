import Header from "./Header.home";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const getAllData = async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get("/order/get-orders");

      setOrders(response.data.orders);
    } catch (err) {
      console.log(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const onClickCancelOrder = async (id) => {
    try {
      setLoading(true);

      await axiosInstance.patch(`/order/cancel/${id}`, {
        reason,
      });

      setReason("");
      setCancelOrderId(null);
      await getAllData();
    } catch (err) {
      console.log(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 px-3 md:px-32 pt-32 pb-10 bg-zinc-100">
        <h2 className="text-2xl font-bold text-zinc-800 mb-6">My Orders</h2>

        {loading ? (
          <div className="text-center py-20">
            <p>Loading...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-10 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="No Orders"
              className="w-32 mx-auto mb-6"
            />

            <h2 className="text-2xl font-bold mb-3">
              You haven't placed any order yet
            </h2>

            <p className="text-gray-500 mb-6">
              Explore products and place your first order.
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-8 py-3 rounded-md">
              Shop Now
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) =>
              order.products.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition p-5">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product */}
                    <div className="flex gap-4 flex-1">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 object-contain border rounded"
                      />

                      <div className="flex flex-col text-left">
                        <div>
                          <h2 className="font-semibold text-lg text-left text-zinc-800 truncate max-w-[200px] md:max-w-[300px]">
                            {item.product.name}
                          </h2>

                          <p className="text-gray-500 text-sm mt-1">
                            Quantity : {item.quantity}
                          </p>

                          {item.offerOnBank > 0 && (
                            <p className="text-green-600 text-sm">
                              Bank Offer : {item.offerOnBank}% OFF
                            </p>
                          )}
                        </div>

                        <div className="mt-3">
                          <p className="font-bold text-xl text-zinc-800">
                            ₹{order.totalAmount.toLocaleString("en-IN")}
                          </p>

                          <p className="text-sm text-gray-500">
                            Payment : {order.paymentMethod}
                          </p>
                        </div>
                        {order.orderStatus === "Cancelled" ? (
                          <button
                            disabled
                            className="bg-red-100 text-red-600 font-semibold px-8 py-2 rounded-md mt-4 cursor-not-allowed">
                            Cancelled
                          </button>
                        ) : order.orderStatus === "Delivered" ? (
                          <button
                            disabled
                            className="bg-green-100 text-green-600 font-semibold px-8 py-2 rounded-md mt-4 cursor-not-allowed">
                            Delivered
                          </button>
                        ) : cancelOrderId === order._id ? (
                          <div className="mt-4">
                            <input
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                              placeholder="Reason for cancellation"
                              className="w-full border rounded px-3 py-2 outline-none"
                            />

                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() => onClickCancelOrder(order._id)}
                                className="bg-red-500 text-white px-5 py-2 rounded">
                                Confirm
                              </button>

                              <button
                                onClick={() => {
                                  setCancelOrderId(null);
                                  setReason("");
                                }}
                                className="bg-gray-200 px-5 py-2 rounded">
                                Close
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setCancelOrderId(order._id)}
                            className="bg-zinc-100 hover:bg-zinc-200 rounded-md text-zinc-700 font-semibold px-8 py-2 shadow mt-4">
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                      <h2 className="font-semibold text-zinc-800 mb-3">
                        Order Details
                      </h2>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Order ID</span>
                          <span className="font-medium break-all">
                            {order._id}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Transaction ID</span>
                          <span className="font-medium break-all">
                            {order.razorpayPaymentId || "-"}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Payment Status</span>

                          <span
                            className={`font-semibold ${
                              order.paymentStatus === "Paid"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}>
                            {order.paymentStatus}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">Order Status</span>

                          <span
                            className={`font-semibold ${
                              order.orderStatus === "Delivered"
                                ? "text-green-600"
                                : "text-blue-600"
                            }`}>
                            {order.orderStatus}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Expected Delivery
                          </span>

                          <span className="font-medium">
                            {new Date(
                              order.expectedDelivery,
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="mt-5 border-t pt-4 text-left">
                        <h3 className="font-semibold text-zinc-800 mb-2">
                          Delivery Address
                        </h3>

                        {order.shippingAddress ? (
                          <>
                            <p className="text-sm text-gray-600">
                              <span className="font-semibold">
                                {order.shippingAddress.fullName}
                              </span>
                            </p>

                            <p className="text-sm text-gray-600">
                              {order.shippingAddress.area},{" "}
                              {order.shippingAddress.locality}
                            </p>

                            <p className="text-sm text-gray-600">
                              {order.shippingAddress.city},{" "}
                              {order.shippingAddress.state} -{" "}
                              {order.shippingAddress.pincode}
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              Phone : {order.shippingAddress.phone}
                            </p>
                          </>
                        ) : (
                          <p className="text-red-500">Address not available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )),
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default OrderPage;
