import Header from "./Header.home";
import Footer from "./Footer";

function Privacy() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 pt-32 px-4 md:px-32 pb-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <div className="space-y-8 text-gray-600 leading-8 text-left">
            <section>
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                Information We Collect
              </h2>

              <ul className="list-disc ml-6 space-y-2">
                <li>Email address</li>
                <li>Name</li>
                <li>Phone number</li>
                <li>Shipping addresses</li>
                <li>Order history</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                How We Use Your Information
              </h2>

              <ul className="list-disc ml-6 space-y-2">
                <li>Process orders</li>
                <li>Deliver products</li>
                <li>Provide customer support</li>
                <li>Improve shopping experience</li>
                <li>Send order notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                Data Protection
              </h2>

              <p>
                We do not sell or rent your personal information to third
                parties. Your information is stored securely using modern
                security practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                Cookies
              </h2>

              <p>
                Quickart uses cookies to improve website performance, remember
                preferences, and provide a better shopping experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                Your Rights
              </h2>

              <p>
                You may request updates or deletion of your personal information
                by contacting our support team.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Privacy;
