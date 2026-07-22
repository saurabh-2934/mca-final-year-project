import Header from "./Header.home";
import Footer from "./Footer";
import { FaBell } from "react-icons/fa";

function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #ORD12345 has been shipped.",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Payment Successful",
      message: "₹24,999 payment received successfully.",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Special Offer",
      message: "Get extra 10% OFF using HDFC Cards.",
      time: "2 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 px-4 md:px-32 pt-32 mt-20 pb-10">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <FaBell className="mr-3 text-blue-600" />
          Notifications
        </h1>

        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition">
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">{item.title}</h2>

                <span className="text-sm text-gray-500">{item.time}</span>
              </div>

              <p className="text-gray-600 mt-2">{item.message}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Notifications;
