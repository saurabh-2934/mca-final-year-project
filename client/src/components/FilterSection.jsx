import { useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";

import axiosInstance from "../utils/axiosInstance";

const rating = [4, 3, 2];
const price = [1000, 2000, 3000, 4000, 5000];

function Filter({
  mobile = false,
  selectBrand,
  category,
  selectRating,
  selectPrice,
}) {
  const [brands, setBrands] = useState([]);

  const [showBrands, setShowBrands] = useState(false);
  const [showRating, setRating] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    const getBrands = async () => {
      try {
        setBrands([]); // Clear previous brands immediately
        const response = await axiosInstance.get(`/product/brand/${category}`);
        setBrands(response?.data);
      } catch (err) {
        console.log(err.response?.data?.message);
      }
    };
    getBrands();
  }, [category]);

  const handleBrandClick = (brand) => {
    if (selectedBrand === brand) {
      // Unselect if clicked again
      setSelectedBrand("");
      selectBrand("");
    } else {
      // Select new brand
      setSelectedBrand(brand);
      selectBrand(brand);
    }
  };

  const handlePriceClick = (price) => {
    if (selectedPrice === price) {
      // Unselect if clicked again
      setSelectedPrice("");
      selectPrice("");
    } else {
      // Select new brand
      setSelectedPrice(price);
      selectPrice(price);
    }
  };

  const handleRatingClick = (rating) => {
    if (selectedRating === rating) {
      // Unselect if clicked again
      setSelectedRating("");
      selectRating("");
    } else {
      // Select new brand
      setSelectedRating(rating);
      selectRating(rating);
    }
  };

  return (
    <div
      className={`bg-gray-100 ${
        mobile
          ? "block w-full"
          : "hidden md:block md:min-w-[300px] md:max-w-[300px] mr-4"
      }`}>
      <h2 className="w-full text-gray-900 text-xl font-semibold text-left border-b-[1px] border-gray-300 px-4 py-2">
        Filters
      </h2>
      <div className="border-b border-gray-300">
        <button
          onClick={() => setShowBrands(!showBrands)}
          className="w-full flex items-center justify-between px-4 py-3">
          <span className="text-lg font-semibold">Brands</span>

          <IoChevronDown
            className={`text-xl transition-transform duration-300 ${
              showBrands ? "rotate-180" : ""
            }`}
          />
        </button>

        {showBrands && (
          <ul className="px-4 pb-3 text-left">
            {brands.map((brand) => (
              <li
                key={brand}
                onClick={() => handleBrandClick(brand)}
                className={`cursor-pointer py-2 transition-colors ${
                  selectedBrand === brand
                    ? "font-bold text-black"
                    : "font-normal text-gray-600 hover:text-blue-600"
                }`}>
                {brand}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-b border-gray-300">
        <button
          onClick={() => setRating(!showRating)}
          className="w-full flex items-center justify-between px-4 py-3">
          <span className="text-lg font-semibold">Retings</span>

          <IoChevronDown
            className={`text-xl transition-transform duration-300 ${
              showRating ? "rotate-180" : ""
            }`}
          />
        </button>

        {showRating && (
          <ul className="px-4 pb-3 text-left">
            {rating.map((eachData) => (
              <li
                key={eachData}
                onClick={() => handleRatingClick(eachData)}
                className={`flex items-center cursor-pointer py-2 transition-colors ${
                  selectedRating === eachData
                    ? "font-bold text-black"
                    : "font-normal text-gray-600 hover:text-blue-600"
                }`}>
                {eachData} <IoStarSharp /> & above
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-b border-gray-300">
        <button
          onClick={() => setShowPrice(!showPrice)}
          className="w-full flex items-center justify-between px-4 py-3">
          <span className="text-lg font-semibold">Price</span>

          <IoChevronDown
            className={`text-xl transition-transform duration-300 ${
              showPrice ? "rotate-180" : ""
            }`}
          />
        </button>

        {showPrice && (
          <ul className="px-4 pb-3 text-left">
            {price.map((eachData) => (
              <li
                key={eachData}
                onClick={() => handlePriceClick(eachData)}
                className={`flex items-center cursor-pointer py-2 transition-colors ${
                  selectedPrice === eachData
                    ? "font-bold text-black"
                    : "font-normal text-gray-600 hover:text-blue-600"
                }`}>
                {eachData} & above
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Filter;
