import Header from "./Header.home";
import Footer from "./Footer";
import {
  FaLock,
  FaShieldAlt,
  FaCreditCard,
  FaUserShield,
} from "react-icons/fa";

function Security() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 pt-32 px-4 md:px-32 pb-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Security</h1>

          <p className="text-gray-600 mb-10">
            Protecting your personal information and payments is one of our
            highest priorities.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <FaLock className="text-4xl text-blue-600 mb-4" />

              <h2 className="font-bold text-xl mb-2">Secure Login</h2>

              <p className="text-gray-600">
                User authentication is protected using encrypted tokens and
                secure account verification.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <FaCreditCard className="text-4xl text-green-600 mb-4" />

              <h2 className="font-bold text-xl mb-2">Secure Payments</h2>

              <p className="text-gray-600">
                Payments are processed securely through trusted payment
                gateways. Sensitive payment information is not stored by
                Quickart.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <FaShieldAlt className="text-4xl text-purple-600 mb-4" />

              <h2 className="font-bold text-xl mb-2">Data Encryption</h2>

              <p className="text-gray-600">
                Personal information is transmitted securely using encrypted
                connections to help protect your data.
              </p>
            </div>

            <div className="border rounded-xl p-6 hover:shadow-lg transition">
              <FaUserShield className="text-4xl text-orange-600 mb-4" />

              <h2 className="font-bold text-xl mb-2">Account Protection</h2>

              <p className="text-gray-600">
                We encourage strong passwords and regularly monitor for
                suspicious activity to help keep accounts secure.
              </p>
            </div>
          </div>

          <div className="mt-10 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3">
              Need Security Assistance?
            </h2>

            <p className="text-gray-700">
              If you notice any suspicious activity on your account or believe
              your information has been compromised, please contact our support
              team immediately so we can assist you.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Security;
