import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLocationSharp, IoSearchOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { BsCart3, BsBoxSeam } from "react-icons/bs";
import { MdLogout, MdFileDownload } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { RiCustomerServiceFill, RiAdvertisementLine } from "react-icons/ri";
import { useCart } from "../context/CartContext";

import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

function Header() {
  const { logout } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const [search, setSearch] = useState("");
  const { cartCount } = useCart();

  const navigate = useNavigate();

  const onSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${search}`);
    }
  };

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const response = await axiosInstance("/address/get-location");

        localStorage.setItem(
          "current_location",
          JSON.stringify(response.data?.location),
        );
        setDisplayName(response.data?.location);
      } catch (err) {
        console.log(err.response?.data?.message);
      }
    };
    getLocationData();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getLocation = async () => {
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );

      const data = await response.json();

      await axiosInstance.put("/address/set-location", {
        displayName: data.display_name,
      });

      localStorage.setItem(
        "current_location",
        JSON.stringify(data.display_name),
      );
      setDisplayName(data.display_name);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onClickLogout = () => {
    logout();
  };
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <Link to="/">
          <button className="font-poppins text-md italic font-bold bg-yellow-300 px-4 py-2 rounded-lg shadow-md flex items-center">
            <span className=" text-2xl text-indigo-700 font-bold mr-2">Q</span>
            QuickCart
          </button>
        </Link>
        {displayName === "" ? (
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4 items-center font-semibold">
            <p className="text-lg text-gray-700">
              <IoLocationSharp className="inline mr-2" />
              Location not set
            </p>
            <p
              className="text-blue-500 hover:underline cursor-pointer flex items-center"
              onClick={getLocation}>
              Select delivery location <FaAngleRight className="ml-2" />
            </p>
          </div>
        ) : (
          <p className="text-lg text-gray-700">
            {" "}
            <IoLocationSharp className="inline mr-2" />
            {displayName}
          </p>
        )}
      </div>

      <div className="flex space-x-4 md:space-x-4 items-center">
        <div className="relative flex items-center w-full md:w-3/4">
          <IoSearchOutline className="absolute text-xl text-gray-600 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={onSearch}
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-500 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ul className="flex mt-2 space-x-4 md:space-x-16 md:mr-8 md:mt-0">
          {/* Profile */}
          <li className="relative group text-gray-700 text-lg md:text-md cursor-pointer">
            <div>
              <CgProfile className="inline mr-1" />
              <span className="hidden md:inline">Profile</span>
            </div>

            <div className="absolute top-full left-0 hidden group-hover:block w-60 bg-white shadow-lg rounded-2xl z-50 border-2 border-gray-200 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
              <ul className="py-2 text-left p-4">
                <Link to="/profile">
                  <li className="px-4 py-2 hover:bg-gradient-to-r from-cyan-100 rounded-l-lg">
                    <CgProfile className="inline mr-2 text-lg" />
                    My Profile
                  </li>
                </Link>
                <Link to="/Orders">
                  <li className="px-4 py-2 hover:bg-gradient-to-r from-cyan-100 rounded-l-lg">
                    <BsBoxSeam className="inline mr-2 text-lg" />
                    Orders
                  </li>
                </Link>
                <li
                  onClick={onClickLogout}
                  className="px-4 py-2 hover:bg-gradient-to-r from-cyan-100 rounded-l-lg">
                  <MdLogout className="inline mr-2 text-lg" />
                  Logout
                </li>
              </ul>
            </div>
          </li>

          {/* More */}
          <li className="relative group text-gray-700 text-lg md:text-md cursor-pointer">
            <div>More</div>

            <div className="absolute top-full right-0 md:left-0  hidden group-hover:block w-60 bg-white shadow-lg rounded-2xl z-50 border-2 border-gray-200 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
              <ul className="py-2 text-left p-4">
                <Link to="/notifications">
                  <li className="px-4 py-2 hover:bg-gradient-to-r from-cyan-100 rounded-l-lg">
                    <IoMdNotifications className="inline mr-2 text-lg" />
                    Notification
                  </li>
                </Link>
                <Link to="/customer_support">
                  <li className="px-4 py-2 hover:bg-gradient-to-r from-cyan-100 rounded-l-lg">
                    <RiCustomerServiceFill className="inline mr-2 text-lg" />
                    Customer Care
                  </li>
                </Link>
                <Link to="/advertisement">
                  <li className="px-4 py-2 hover:bg-gradient-to-r from-cyan-100 rounded-l-lg">
                    <RiAdvertisementLine className="inline mr-2 text-lg" />
                    Advertise
                  </li>
                </Link>
                <li className="px-4 py-2 hover:bg-gradient-to-r from-cyan-100 rounded-l-lg">
                  <MdFileDownload className="inline mr-2 text-lg" />
                  Download App
                </li>
              </ul>
            </div>
          </li>

          {/* Cart */}
          <Link to="/Carts">
            <li className="flex items-center text-gray-700 text-lg md:text-md cursor-pointer">
              <div className="relative inline-block">
                <BsCart3 className="text-xl" />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </div>

              <span className="hidden md:inline ml-1">Cart</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
