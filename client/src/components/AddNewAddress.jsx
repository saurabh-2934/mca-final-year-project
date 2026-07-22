import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header.home";
import Input from "./Input";
import Loader from "./Loader";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

function AddNewAddress() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeName = (value) => {
    setFullName(value);
  };
  const onChangePhone = (value) => {
    setPhone(value);
  };
  const onChangePincode = (value) => {
    setPincode(value);
  };
  const onChangeLocality = (value) => {
    setLocality(value);
  };
  const onChangeArea = (e) => {
    setArea(e.target.value);
  };
  const onChangeCity = (value) => {
    setCity(value);
  };
  const onChangeLandMark = (value) => {
    setLandmark(value);
  };
  const onChangeAlternateNumber = (value) => {
    setAlternateNumber(value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.post("/address/add-address", {
        fullName,
        phone,
        pincode,
        locality,
        area,
        city,
        state,
        landmark,
        addressType,
        alternateNumber,
      });

      toast.success("Address added successfuly!", {
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
      setFullName("");
      setPhone("");

      setPincode("");

      setLocality("");

      setArea("");

      setCity("");

      setLandmark("");

      setAlternateNumber("");
      setState("");

      setError(false);
      navigate(-1);
    } catch (err) {
      setError(true);
      const ifArray = err.response?.data?.errors;
      if (ifArray && ifArray.length > 0) {
        const message = ifArray.map((data) => data.msg).join(" & ");
        setErrMsg(message);
      } else {
        setErrMsg(err.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="px-4 md:px-32 py-4">
        <Header />
        <div className="bg-zinc-50 p-4 shadow-[0_0_20px_rgba(0,0,0,0.25)]">
          <h2 className="text-zinc-700 text-xl font-semibold text-left px-4 mb-4">
            Manage Address
          </h2>
          <form
            onSubmit={onSubmitForm}
            className="border-[1px] border-gray-200 bg-sky-50 p-4 rounded-sm">
            <h2 className="text-blue-700 text-lg text-left">Add new address</h2>
            <div className="w-full lg:w-1/2 flex flex-wrap">
              <Input
                type="text"
                name="Name"
                value={fullName}
                required
                onChangeName={onChangeName}
              />
              <Input
                type="text"
                name="10 digit mobile number"
                value={phone}
                required
                onChangeName={onChangePhone}
              />
              <Input
                type="text"
                name="Pincode"
                value={pincode}
                required
                onChangeName={onChangePincode}
              />
              <Input
                type="text"
                name="Locality"
                value={locality}
                required
                onChangeName={onChangeLocality}
              />
            </div>
            <div className="relative pl-4 pr-4 pt-2 w-full lg:w-1/2">
              <input
                id="address"
                type="text"
                required
                value={area}
                onChange={onChangeArea}
                placeholder=" "
                className="peer w-full border-[1px] border-gray-300 px-5  pb-1 h-[100px] outline-none focus:border-blue-400"
              />
              <label
                htmlFor="address"
                className="absolute left-8 top-6 bg-white px-1 text-sm text-gray-600 transition-all duration-200
                    peer-focus:top-3
                    peer-focus:text-md
                    peer-[:not(:placeholder-shown)]:top-3
                    peer-[:not(:placeholder-shown)]:text-md">
                Adress (Area and Street)
              </label>
            </div>
            <div className="w-full lg:w-1/2 flex flex-wrap mb-4">
              <Input
                type="text"
                name="City/District/Town"
                required
                value={city}
                onChangeName={onChangeCity}
              />
              <div className="relative pl-4 pr-4 pt-2 w-full md:w-1/2">
                <select
                  id="state"
                  required
                  defaultValue=""
                  onChange={(e) => setState(e.target.value)}
                  className="peer w-full border border-gray-300 p-0 px-4 h-[50px] outline-none focus:border-blue-400 bg-white">
                  <option value="" disabled hidden>
                    -- Select state --
                  </option>

                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <label
                  htmlFor="state"
                  className="absolute left-8 border-t border-gray-300 w-fit top-2 bg-white  text-sm text-gray-600">
                  State
                </label>
              </div>
              <Input
                type="text"
                name="Landmark (Optional)"
                value={landmark}
                onChangeName={onChangeLandMark}
              />
              <Input
                type="text"
                value={alternateNumber}
                name="Alternate Phone (Optional)"
                onChangeName={onChangeAlternateNumber}
              />
            </div>
            <p className="text-gray-600 text-md text-left px-4 mb-4">
              Address Type
            </p>
            <div className="flex text-left px-4 mb-4">
              <div className="mr-8">
                <input
                  type="radio"
                  id="home"
                  name="addressType"
                  value="Home"
                  checked={addressType === "Home"}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="home">Home</label>
              </div>

              <div className="mr-8">
                <input
                  type="radio"
                  id="work"
                  name="addressType"
                  value="Work"
                  checked={addressType === "Work"}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="work">Work</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="others"
                  name="addressType"
                  value="Others"
                  checked={addressType === "Others"}
                  onChange={(e) => setAddressType(e.target.value)}
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="others">Others</label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center px-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-24 py-3 rounded-sm shadow-[0_0_20px_rgba(0,0,0,0.25)] font-semibold mr-8 mb-4">
                SAVE
              </button>
              <p
                onClick={() => navigate(-1)}
                className="text-blue-500 text-sm font-semibold text-popins cursor-pointer">
                CANCEL
              </p>
            </div>
            <p className="p-4 text-red-500 text-sm font-semibold">
              {error ? errMsg : ""}
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddNewAddress;
