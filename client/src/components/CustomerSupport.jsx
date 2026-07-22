import Header from "./Header.home";
import Footer from "./Footer";
import {
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function CustomerSupport() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 px-4 md:px-32 pt-32 mt-20 pb-10">
        <h1 className="text-3xl font-bold flex items-center mb-8">
          <FaHeadset className="mr-3 text-blue-600" />
          Customer Support
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-bold text-xl mb-6">Contact Information</h2>

            <div className="space-y-5">
              <div className="flex items-center">
                <FaPhoneAlt className="text-blue-600 mr-4" />
                +91 7654907414
              </div>

              <div className="flex items-center">
                <FaEnvelope className="text-blue-600 mr-4" />
                quickcart.ecommerce.off@gmail.com
              </div>

              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-600 mr-4" />
                RMDC, Near LIC Office, Aurangabad Bihar
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-bold text-xl mb-6">Support Hours</h2>

            <div className="space-y-3">
              <p>Monday - Friday : 9 AM - 8 PM</p>

              <p>Saturday : 10 AM - 6 PM</p>

              <p>Sunday : Closed</p>

              <hr />

              <p className="text-gray-600">
                We usually respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CustomerSupport;
