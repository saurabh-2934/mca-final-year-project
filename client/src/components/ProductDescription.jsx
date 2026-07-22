import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import { TiArrowDown } from "react-icons/ti";
import { GrLocation } from "react-icons/gr";
import { FaAngleRight } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa6";
import { BsCartCheckFill } from "react-icons/bs";
import { useCart } from "../context/CartContext";
import { PiTruck } from "react-icons/pi";

import CardOfferSection from "./CardOfferSection";

import formatDateWithDay from "../utils/getDate";
import SelectAddress from "./SelectAddress";
import axiosInstance from "../utils/axiosInstance";

const today = new Date();

const fiveDaysLater = new Date(today);
fiveDaysLater.setDate(today.getDate() + 5);

function ProductDescription({ product }) {
  const [total, setTotal] = useState(
    Math.round(
      Number(product.price) -
        (Number(product.price) * Number(product.discount)) / 100,
    ),
  );
  const { refreshCart } = useCart();
  const [showAddress, setShowAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [offerOnBank, setOfferOnBank] = useState(0);
  const [isInCart, setCart] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getLocation = async () => {
      setCurrentAddress(JSON.parse(localStorage.getItem("current_location")));
      const address = JSON.parse(localStorage.getItem("current_address"));

      if (address) {
        const crrAddress = [
          address.area,
          address.city,
          address.locality,
          address.state,
          address.pincode,
        ]
          .filter(Boolean)
          .join(", ");

        setCurrentAddress(crrAddress);
      }
    };
    const getCart = async () => {
      try {
        const response = await axiosInstance.get(
          `/cart/get-product/${product.id}`,
        );

        setCart(response.data.isInCart);
      } catch (err) {
        setCart(false);
      }
    };
    getLocation();
    getCart();
  }, [showAddress, product.id]);

  const onClickAddCart = async () => {
    try {
      const response = await axiosInstance.post(
        `/cart/add-product/${product.id}`,
        {
          offerOnBank,
        },
      );
      if (response.data?.success) {
        setCart(true);
      }
      await refreshCart();
    } catch (err) {
      setCart(true);
      console.log(err.response?.data?.message);
    }
  };

  const setCurrentLocation = () => {
    setCurrentAddress(JSON.parse(localStorage.getItem("current_location")));
    setShowAddress(!showAddress);
  };

  const withBankOffer = (price, offerPer) => {
    setTotal(price);
    setOfferOnBank(offerPer);
  };

  const onClickSelectAddress = () => {
    setShowAddress(!showAddress);
  };

  const onClickBuyNow = () => {
    onClickAddCart();
    navigate("/Carts", { replace: true });
  };

  return (
    <div className="w-full md:w-[30vw]">
      <p className="mt-3 text-left text-gray-600">{product.description}</p>
      <p className="mt-2 flex items-center text-left text-gray-700 bg-gray-100 px-4 py-1 w-fit rounded-md font-semibold mb-8">
        {product.rating} <IoStarSharp className="ml-1 text-green-700 text-sm" />
      </p>
      <div className="flex justify-start items-center mb-8">
        <h2 className="text-2xl md:text-3xl flex items-center font-bold text-green-700 mr-2">
          <TiArrowDown className="text-5xl font-bold ml-[-10px] mr-[-10px]" />
          {product.discount}%
        </h2>
        <p className="text-2xl  text-zinc-500 line-through mr-2">
          {product.price.toLocaleString("en-IN")}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-700">
          ₹
          {Math.round(
            Number(product.price) -
              (Number(product.price) * Number(product.discount)) / 100,
          ).toLocaleString("en-IN")}
        </h2>
      </div>
      <CardOfferSection price={total} withBankOffer={withBankOffer} />
      <div>
        <h2 className="text-zinc-700 text-2xl font-bold text-left mb-4">
          Delivery details
        </h2>
        <div className="mb-4">
          <h2
            className="bg-sky-50 rounded-t-xl text-zinc-600 px-4 py-2 cursor-pointer flex items-center mb-[3px]"
            onClick={onClickSelectAddress}>
            <GrLocation className="text-gray-900 mr-2 flex-shrink-0" />

            <span className="flex-1 truncate">
              {currentAddress || "Select delivery address"}
            </span>

            <FaAngleRight className="text-sm ml-2 flex-shrink-0" />
          </h2>
          <h2 className="bg-gray-100 text-zinc-700 rounded-b-xl px-4 py-2 font-bold text-lg text-left flex items-center">
            <PiTruck className="text-gray-900 mr-2" /> Delivery by{" "}
            {formatDateWithDay(fiveDaysLater)}
          </h2>
        </div>
      </div>
      {showAddress && (
        <SelectAddress
          hideAddress={onClickSelectAddress}
          setCurrentLocation={setCurrentLocation}
        />
      )}
      <h2 className="text-zinc-700 text-2xl font-bold text-left mb-4">
        Product highlights
      </h2>

      <ul className="w-full px-4 gap-x-6 text-left mb-4">
        {product.highlights.map((highlight, index) => (
          <li
            key={index}
            className="border-b border-gray-300 py-2 text-sm md:text-base text-zinc-500 break-words">
            {highlight}
          </li>
        ))}
      </ul>

      <div className="mb-4">
        <h2 className="text-zinc-700 text-2xl font-bold text-left mb-4">
          Ratings and reviews
        </h2>
        {product.reviews.length === 0 ? (
          <p className="text-zinc-500 text-base font-semibold mb-2">
            No reviews yet!
          </p>
        ) : (
          ""
        )}
        <div className="w-full flex mb-6">
          <input
            type="text"
            placeholder="Add your commnets"
            className="outline-none border-b-[1px] border-zinc-700 w-full mr-2"
          />
          <button className="bg-yellow-300 text-base font-bold text-zinc-700 px-4 py-2 rounded-md hover:bg-yellow-400">
            Add
          </button>
        </div>
        <div className="flex w-full items-center sticky">
          {isInCart ? (
            <Link to="/Carts">
              <button className="border-[1px] border-zinc-400 rounded-xl p-2 mr-4">
                <BsCartCheckFill className="text-4xl text-green-600" />
              </button>
            </Link>
          ) : (
            <button
              className="border-[1px] border-zinc-400 rounded-xl p-2 mr-4"
              onClick={onClickAddCart}>
              <FaCartPlus className="text-4xl" />
            </button>
          )}
          <Link to="/Carts">
            <button
              onClick={onClickBuyNow}
              className="bg-yellow-300 text-lg font-bold text-zinc-700 px-6 py-3 rounded-xl hover:bg-yellow-400">
              By Now at ₹ {total.toLocaleString("en-IN")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
