import { useEffect, useState } from "react";
import { IoFilter, IoSwapVertical } from "react-icons/io5";

import axiosInstance from "../utils/axiosInstance";
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import FilterSection from "./FilterSection";

function OhterCategories({ selectedCategory, search }) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [order, setOrder] = useState("desc");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  useEffect(() => {
    setProducts([]);
    setPrice("");
    setRating("");
    setBrand("");
    setOrder("desc");
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        // const response = await axiosInstance.get(
        //   `/products?category=${selectedCategory}&page=${currentPage}&brand=${brand}&rating=${rating}&minprice=${price}&sort=price&order=${order}`,
        // );
        const response = await axiosInstance.get("/products", {
          params: {
            search,
            category: selectedCategory === "For You" ? "" : selectedCategory,
            page: currentPage,
            brand,
            rating,
            minprice: price,
            sort: "price",
            order,
          },
        });

        setCurrentPage(response.data?.currentPage);
        setTotalPage(response.data?.totalPages);

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
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [selectedCategory, currentPage, brand, rating, price, order, search]);

  const onChangeBrand = (currentBrand) => {
    setBrand(currentBrand);
  };
  const onClickPrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const onClickNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const selectRating = (rate) => {
    setRating(rate);
  };

  const selectPrice = (pr) => {
    setPrice(pr);
  };

  return (
    <div className="px-4 md:px-32 py-4 mt-4">
      {loading && <Loader />}
      <div className="flex">
        <FilterSection
          selectBrand={onChangeBrand}
          category={selectedCategory}
          selectRating={selectRating}
          selectPrice={selectPrice}
        />
        <div>
          {/* Mobile */}
          <div className="md:hidden sticky mt-[-20px] bg-white z-20 flex border">
            <button
              onClick={() => setShowSortModal(true)}
              className="w-1/2 flex justify-center items-center py-3 border-r">
              <IoSwapVertical className="mr-2" />
              Sort
            </button>

            <button
              onClick={() => setShowFilterModal(true)}
              className="w-1/2 flex justify-center items-center py-3">
              <IoFilter className="mr-2" />
              Filter
            </button>
          </div>

          <div className="flex items-center hidden md:flex mb-4">
            <p className="text-gray-900 text-xl font-bold mr-4 pb-2">
              Sort By{" "}
            </p>
            <p
              onClick={() => setOrder("desc")}
              className={`pb-2 text-md font-semibold mr-8 hover:text-blue-600 cursor-pointer ${order === "desc" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}>
              Price -- Hight to Low{" "}
            </p>
            <p
              onClick={() => setOrder("asc")}
              className={`pb-2 text-md font-semibold hover:text-blue-600 cursor-pointer ${order === "asc" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}>
              Price -- Low to High{" "}
            </p>
          </div>
          {showSortModal && (
            <div className="fixed inset-0 z-50 bg-black/40">
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5">
                <h2 className="font-bold text-xl mb-5">Sort By</h2>

                <button
                  onClick={() => {
                    setOrder("desc");
                    setShowSortModal(false);
                  }}
                  className={`w-full text-left py-3 ${
                    order === "desc" && "text-blue-600 font-bold"
                  }`}>
                  Price : High to Low
                </button>

                <button
                  onClick={() => {
                    setOrder("asc");
                    setShowSortModal(false);
                  }}
                  className={`w-full text-left py-3 ${
                    order === "asc" && "text-blue-600 font-bold"
                  }`}>
                  Price : Low to High
                </button>
              </div>
            </div>
          )}
          {showFilterModal && (
            <div className="fixed inset-0 bg-black/40 z-50">
              <div className="absolute bottom-0 left-0 right-0 h-[80vh] bg-white rounded-t-2xl overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="font-bold text-xl">Filters</h2>

                  <button onClick={() => setShowFilterModal(false)}>✕</button>
                </div>

                <FilterSection
                  mobile={true}
                  category={selectedCategory}
                  selectBrand={onChangeBrand}
                  selectRating={selectRating}
                  selectPrice={selectPrice}
                />

                <div className="p-4">
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
          <ul className="flex flex-wrap space-x-6 ">
            {products.map((eachData) => (
              <ProductCard key={eachData.id} product={eachData} />
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {currentPage !== 1 && (
          <button
            onClick={onClickPrev}
            className="border border-gray-200 px-4 py-2 bg-gray-200 hover:bg-gray-100 hover:shadow-lg rounded-lg font-semibold mr-4">
            Prev
          </button>
        )}
        <p className="text-gray-900 font-bold text-md mr-4">
          current page: {currentPage}
        </p>
        {currentPage !== totalPage && (
          <button
            onClick={onClickNext}
            className="border border-gray-200 px-4 py-2 bg-gray-200 hover:bg-gray-100 hover:shadow-lg rounded-lg font-semibold">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default OhterCategories;
