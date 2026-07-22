import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { IoStar } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";

function ProductCard({ product }) {
  const [wishList, setWishList] = useState(false);

  const onClickWishList = () => {
    setWishList(!wishList);
    const message = !wishList
      ? "Added to your wishlish"
      : "Removed from your wishlist";
    toast.success(message, {
      style: {
        background: "transparent",
        color: "#16a34a",
        boxShadow: "none",
        border: "none",
      },
      iconTheme: {
        primary: "#16a34a",
        secondary: "#fff",
      },
    });
  };
  return (
    <Link to={`/product/${product.id}`}>
      <div className="mb-4 group w-full md:min-w-[280px] md:max-w-[280px] md:min-h-[400px] md:max-h-[400px] rounded-xl  bg-white overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
        {/* Image */}
        <div className="h-60 bg-gray-50 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="text-gray-800 font-medium text-base line-clamp-2 min-h-[48px] mb-1">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <p className="flex w-fit rounded-md px-2 py-1 gap-1 items-center bg-green-600 text-sm font-semibold text-white">
              {product.rating}
              <IoStar className="text-sm" />
            </p>
            {wishList ? (
              <FcLike onClick={onClickWishList} />
            ) : (
              <CiHeart onClick={onClickWishList} className="text-xl" />
            )}
          </div>
          {product.price && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-500 line-through">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              {product.price && (
                <span className="text-lg font-semibold text-gray-900">
                  {Math.round(
                    Number(product.price) -
                      (Number(product.price) * Number(product.discount)) / 100,
                  ).toLocaleString("en-IN")}
                </span>
              )}

              {product.discount && (
                <span className="text-sm font-medium text-green-600">
                  {product.discount}% off
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
