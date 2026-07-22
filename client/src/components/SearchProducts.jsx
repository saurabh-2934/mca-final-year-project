import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import ProductCard from "./ProductCard";

function SearchProducts({ search, selectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosInstance.get("/products", {
          params: {
            search,
            category: selectedCategory === "For You" ? "" : selectedCategory,
          },
        });

        const newProduct = response.data?.products.map((eachData) => ({
          id: eachData._id,
          name: eachData.name,
          rating: eachData.rating,
          price: eachData.price,
          discount: eachData.discountPercentage,
          image: eachData.images[0],
        }));

        setProducts(newProduct);
      } catch (err) {
        console.log(err.response?.data?.message);
      }
    };

    getProducts();
  }, [search, selectedCategory]);

  return (
    <div className="px-4 md:px-32 pt-10">
      <h2 className="text-2xl font-bold mb-6">Search Results for "{search}"</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchProducts;
