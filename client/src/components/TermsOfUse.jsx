import Header from "./Header.home";
import Footer from "./Footer";

function TermsOfUse() {
  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 pt-32 px-4 md:px-32 pb-10">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>

          <div className="space-y-8 text-gray-600 leading-8 text-left">
            <section>
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                Acceptance of Terms
              </h2>

              <p>
                By accessing or using Quickart, you agree to comply with these
                Terms of Use. If you do not agree with these terms, please do
                not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                User Responsibilities
              </h2>

              <ul className="list-disc ml-6 space-y-2">
                <li>Provide accurate account information.</li>
                <li>Keep your login credentials secure.</li>
                <li>Do not misuse or attempt to disrupt our platform.</li>
                <li>Use the website only for lawful purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                Orders & Payments
              </h2>

              <p>
                Orders are subject to product availability and successful
                payment verification. Quickart reserves the right to cancel
                orders due to pricing errors, stock limitations, or fraudulent
                activity.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                Intellectual Property
              </h2>

              <p>
                All website content, including logos, images, product
                information, and design, belongs to Quickart and may not be
                copied or reproduced without permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                Changes to Terms
              </h2>

              <p>
                We may update these Terms of Use from time to time. Continued
                use of the website after updates indicates your acceptance of
                the revised terms.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TermsOfUse;
