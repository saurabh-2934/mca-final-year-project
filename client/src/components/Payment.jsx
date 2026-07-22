import Header from "./Header.home";
import Footer from "./Footer";

function Payment() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 pt-32 px-4 md:px-32 pb-10 mt-20">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Payment Information</h1>

          <div className="space-y-8 text-left">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                Accepted Payment Methods
              </h2>

              <ul className="list-disc ml-6 text-gray-600 space-y-2">
                <li>Credit Cards</li>
                <li>Debit Cards</li>
                <li>UPI</li>
                <li>Net Banking</li>
                <li>Razorpay Secure Payments</li>
                <li>Cash on Delivery (Selected Locations)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Secure Payments</h2>

              <p className="text-gray-600">
                Every transaction is secured using industry-standard encryption.
                Your payment details are never stored on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Payment Issues</h2>

              <p className="text-gray-600">
                If money is deducted but your order is not confirmed, the amount
                is automatically refunded within 5-7 business days.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Payment;
