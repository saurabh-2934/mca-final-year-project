import { useState, useEffect } from "react";

function OfferSection() {
  const offers = [
    "/offer_1.webp",
    "/offer_2.webp",
    "/offer_3.webp",
    "/offer_4.webp",
  ];

  // Clone first image
  const slides = [...offers, offers[0]];

  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Reset after reaching cloned slide
  useEffect(() => {
    if (index === offers.length) {
      const timeout = setTimeout(() => {
        setTransition(false);
        setIndex(0);

        // Enable transition again
        setTimeout(() => setTransition(true), 50);
      }, 700); // match transition duration

      return () => clearTimeout(timeout);
    }
  }, [index, offers.length]);

  return (
    <div className="relative overflow-hidden  px-4 md:px-32 py-4 mt-4">
      <div
        className={`flex ${
          transition ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}>
        {slides.map((offer, i) => (
          <div key={i} className="min-w-full px-4">
            <img
              src={offer}
              alt={`Offer ${i + 1}`}
              className="w-full h-52 md:h-60 rounded-2xl object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {offers.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              (index === offers.length ? 0 : index) === i
                ? "w-6 h-2 bg-blue-600"
                : "w-2 h-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default OfferSection;
