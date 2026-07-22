import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Header from "./Header.home";
import Footer from "./Footer";
import Loader from "./Loader";

import ProductDescription from "./ProductDescription";

function ProductDetails() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    brand: "",
    category: "",
    description: "",
    discount: 0,
    highlights: [],
    images: [],
    name: "",
    price: 0,
    rating: 0,
    reviews: [],
  });

  const [showGallery, setShowGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data } = await axiosInstance.get(`/product/${id}`);

        const responseData = data?.product || {};

        setProduct({
          id: id,
          brand: responseData.brand || "",
          category: responseData.category || "",
          description: responseData.description || "",
          discount: responseData.discountPercentage || 0,
          highlights: responseData.highlights || [],
          images: responseData.images || [],
          name: responseData.name || "",
          price: responseData.price || 0,
          rating: responseData.rating || 0,
          reviews: responseData.reviews || [],
        });
      } catch (err) {
        console.log(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50">
        <div className="px-4 md:px-32 py-4">
          <Header />
        </div>
      </div>
      <main className="transition-all duration-300 px-4 md:px-32 py-4 pt-44">
        <div className="p-4 flex flex-col md:flex-row gap-8">
          {/* Images */}
          <div className="w-full ">
            {/* Mobile */}
            <ul className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4">
              {product.images.map((image, index) => (
                <li key={index} className="min-w-full snap-center">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full aspect-square object-contain rounded-lg bg-gray-100"
                  />
                </li>
              ))}
            </ul>

            {/* Desktop */}
            <ul className="hidden md:grid grid-cols-2 gap-4">
              {product.images.slice(0, 5).map((image, index) => (
                <li
                  key={index}
                  className="relative cursor-pointer"
                  onClick={() => {
                    setCurrentImage(index);
                    setShowGallery(true);
                  }}>
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full aspect-square object-contain rounded-lg bg-gray-100 border"
                  />

                  {index === 4 && product.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        +{product.images.length - 5}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Product Details */}
          <ProductDescription product={product} />
        </div>

        {/* Full Screen Gallery */}
        {showGallery && (
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            {/* Close */}
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-5 right-8 text-gray-700 text-2xl hover:text-4xl hover:text-gray-900">
              &times;
            </button>

            {/* Previous */}
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === 0 ? product.images.length - 1 : prev - 1,
                )
              }
              className="absolute left-6 text-gray-800 border border-gray-300 rounded-md py-8 px-4 text-2xl hover:text-gray-900 hover:shadow-lg">
              &#10094;
            </button>

            {/* Image */}
            <img
              src={product.images[currentImage]}
              alt=""
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            {/* Next */}
            <button
              onClick={() =>
                setCurrentImage((prev) =>
                  prev === product.images.length - 1 ? 0 : prev + 1,
                )
              }
              className="absolute right-6 text-gray-800 border border-gray-300 rounded-md py-8 px-4 text-2xl hover:text-gray-900 hover:shadow-lg">
              &#10095;
            </button>

            {/* Counter */}
            <div className="absolute bottom-8 text-white text-xl font-semibold">
              {currentImage + 1} / {product.images.length}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default ProductDetails;
