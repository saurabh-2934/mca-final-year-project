import Header from "./Header.home";
import Footer from "./Footer";

function Shipping() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 pt-32 px-4 md:px-32 pb-10 mt-20">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>

          <div className="space-y-8 text-left">
            <section>
              <h2 className="text-xl font-semibold mb-3">Delivery Time</h2>

              <p className="text-gray-600">
                Orders are generally delivered within 3-7 business days,
                depending on your location.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Shipping Charges</h2>

              <ul className="list-disc ml-6 text-gray-600 space-y-2">
                <li>Free shipping on eligible products.</li>
                <li>Standard shipping charges may apply.</li>
                <li>Express delivery is available in selected cities.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Order Tracking</h2>

              <p className="text-gray-600">
                You can track your order anytime from the My Orders page after
                your order has been shipped.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Shipping;
