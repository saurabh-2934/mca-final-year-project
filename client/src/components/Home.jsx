import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Header from "./Header.home";
import Categories from "./Categories";
import OfferSection from "./OfferSection";
import Footer from "./Footer";
import ForYouSection from "./ForYouSection";
import OhterCategories from "./OhterCategories";

function Home() {
  const [hideImage, setHideImage] = useState(false);
  const [selectedCategory, setSelectedCat] = useState("For You");

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const navigate = useNavigate();
  // const selectedCat = (category) => {
  //   setSelectedCat(category.name);
  // };
  const selectedCat = (category) => {
    navigate("/"); // removes ?search=
    setSelectedCat(category.name);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHideImage(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50">
        <div className="px-4 md:px-32 py-4">
          <Header />
          <Categories hideImage={hideImage} selectedCat={selectedCat} />
        </div>
      </div>

      <main
        className={`transition-all duration-300 ${
          hideImage ? "pt-44" : "pt-64"
        }`}>
        {selectedCategory === "For You" && !search ? (
          <>
            <OfferSection />
            <ForYouSection />
          </>
        ) : (
          <OhterCategories
            selectedCategory={selectedCategory}
            search={search}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
