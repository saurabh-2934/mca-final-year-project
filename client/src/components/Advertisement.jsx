import Header from "./Header.home";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Advertisement() {
  const offers = [
    {
      title: "Big Billion Sale",
      image: "/offer_coupon.webp",
      desc: "Up to 80% OFF on Electronics.",
    },
    {
      title: "Bank Offer",
      image: "/offer_coupon.webp",
      desc: "10% Instant Discount on HDFC Cards.",
    },
    {
      title: "Free Delivery",
      image: "/offer_coupon.webp",
      desc: "Free shipping above ₹499.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50 px-4 md:px-32 py-4">
        <Header />
      </div>

      <main className="flex-1 px-4 md:px-32 pt-32 mt-20 pb-10">
        <h1 className="text-3xl font-bold mb-8">Latest Offers</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">
                <h2 className="font-bold text-xl">{offer.title}</h2>

                <p className="text-gray-600 mt-3">{offer.desc}</p>
                <Link to="/">
                  <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Advertisement;
