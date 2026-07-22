import Header from "./Header.home";
import Footer from "./Footer";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function ContactUs() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 pt-32 px-4 md:px-32 pb-10 mt-20">
        <h1 className="text-4xl font-bold text-zinc-800 mb-8">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-center text-left">
                <FaPhoneAlt className="text-blue-600 text-xl mr-4" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>+91 7654907414</p>
                </div>
              </div>

              <div className="flex items-center text-left">
                <FaEnvelope className="text-blue-600 text-xl mr-4" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>quickcart.ecommerce.off@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center text-left">
                <FaMapMarkerAlt className="text-blue-600 text-xl mr-4" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p>RMDC Near LIC office Aurangabad (Bihar)</p>
                </div>
              </div>

              <div className="flex items-center text-left">
                <FaClock className="text-blue-600 text-xl mr-4" />
                <div>
                  <p className="font-semibold">Support Hours</p>
                  <p>Mon - Sat : 9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            <div className="space-y-5">
              <input
                placeholder="Your Name"
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
              />

              <input
                placeholder="Your Email"
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
              />

              <textarea
                rows="6"
                placeholder="Write your message..."
                className="w-full border rounded-lg p-3 outline-none focus:border-blue-600"
              />

              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ContactUs;
