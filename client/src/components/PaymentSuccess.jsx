import Header from "./Header.home";
import Footer from "./Footer";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isPaymentSuccess = sessionStorage.getItem("paymentSuccessExpiry");

    if (!isPaymentSuccess || Date.now() > Number(isPaymentSuccess)) {
      sessionStorage.removeItem("paymentSuccessExpiry");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  if (!location.state) return null;

  const { orderId, expectedDelivery } = location.state;
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 px-4 md:px-32 pt-36 pb-10 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 text-center">
          <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-zinc-800 mb-3">
            Payment Successful 🎉
          </h1>

          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been placed successfully
            and will be processed shortly.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-left mb-8">
            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Order ID</span>
              <span className="font-semibold text-zinc-800">{orderId}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-gray-600">Payment Status</span>
              <span className="text-green-600 font-semibold">Paid</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Expected Delivery</span>
              <span className="font-semibold text-zinc-800">
                {expectedDelivery}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/orders">
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition">
                View Orders
              </button>
            </Link>

            <Link to="/">
              <button className="w-full sm:w-auto border border-gray-300 hover:bg-gray-100 text-zinc-800 px-8 py-3 rounded-md font-semibold transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PaymentSuccess;
