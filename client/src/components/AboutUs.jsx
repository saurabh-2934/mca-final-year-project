import Header from "./Header.home";
import Footer from "./Footer";
import { FaShoppingBag, FaUsers, FaTruck } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="pt-32 flex-1 px-4 md:px-32 pb-10 mt-20">
        <div className="bg-white rounded-xl shadow-lg p-10">
          <h1 className="text-4xl font-bold mb-8 text-zinc-800">
            About QuickArt
          </h1>

          <p className="text-gray-600 leading-8 text-lg">
            QuickArt is a modern e-commerce platform designed to make online
            shopping simple, secure and enjoyable. We provide high-quality
            products across multiple categories including Electronics, Fashion,
            Home Appliances, Furniture, Accessories and much more.
          </p>

          <p className="text-gray-600 leading-8 text-lg mt-6">
            Our goal is to deliver trusted products at competitive prices with
            fast delivery and excellent customer support.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <FaShoppingBag className="text-5xl text-blue-600 mx-auto mb-4" />

              <h2 className="font-bold text-xl">Thousands of Products</h2>

              <p className="text-gray-600 mt-3">
                Wide collection from trusted brands.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center">
              <FaTruck className="text-5xl text-green-600 mx-auto mb-4" />

              <h2 className="font-bold text-xl">Fast Delivery</h2>

              <p className="text-gray-600 mt-3">
                Quick and secure delivery across India.
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 text-center">
              <FaUsers className="text-5xl text-yellow-600 mx-auto mb-4" />

              <h2 className="font-bold text-xl">Trusted by Customers</h2>

              <p className="text-gray-600 mt-3">
                Customer satisfaction is our highest priority.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AboutUs;
