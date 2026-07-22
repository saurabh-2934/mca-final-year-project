import Header from "./Header.home";
import Footer from "./Footer";

function FAQ() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 pt-32 px-4 md:px-32 pb-10 mt-20">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">
            Frequently Asked Questions
          </h1>

          <div className="space-y-6 text-left">
            <div>
              <h2 className="font-semibold text-lg">
                How do I track my order?
              </h2>

              <p className="text-gray-600 mt-2">
                Visit the My Orders page and select your order to view the
                latest tracking information.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-lg">Can I cancel my order?</h2>

              <p className="text-gray-600 mt-2">
                Yes, before the order has been shipped.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-lg">
                Which payment methods are accepted?
              </h2>

              <p className="text-gray-600 mt-2">
                We accept UPI, Credit Cards, Debit Cards, Net Banking, Razorpay
                payments, and Cash on Delivery for eligible locations.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-lg">
                How long does delivery take?
              </h2>

              <p className="text-gray-600 mt-2">
                Most orders are delivered within 3-7 business days.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-lg">
                What if I receive a damaged product?
              </h2>

              <p className="text-gray-600 mt-2">
                Contact customer support immediately and request a replacement
                or refund within the return period.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FAQ;
