import Header from "./Header.home";
import Footer from "./Footer";

function CancellationReturns() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 pt-32 px-4 md:px-32 pb-10 mt-20">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Cancellation & Returns</h1>

          <div className="space-y-8 text-left">
            <section>
              <h2 className="text-xl font-semibold mb-3">Order Cancellation</h2>

              <p className="text-gray-600">
                Orders can be cancelled before they are shipped. Once shipped,
                cancellation may not be possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Return Policy</h2>

              <p className="text-gray-600">
                Eligible products can be returned within 7 days of delivery if
                they are damaged, defective, or incorrect.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Refunds</h2>

              <p className="text-gray-600">
                Refunds are initiated after successful inspection of the
                returned product and usually reflect within 5-7 business days.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CancellationReturns;
