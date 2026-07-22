import { useEffect, useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { Link } from "react-router-dom";
import AddressCart from "./AddressCart";
import axiosInstance from "../utils/axiosInstance";
import SmallLoader from "./SmallLoader";

function SelectAddress({ hideAddress, setCurrentLocation }) {
  const [adresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/address/get-addresses");
        const newAddress = response.data?.address.map((eachData) => ({
          id: eachData._id,
          addressType: eachData.addressType,
          area: eachData.area,
          city: eachData.city,
          country: eachData.country,
          landmark: eachData.landmark,
          locality: eachData.locality,
          state: eachData.state,
          fullName: eachData.fullName,
          phone: eachData.phone,
          pincode: eachData.pincode,
          isDefault: eachData.isDefault,
        }));

        setAddresses(newAddress);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getAddresses();
  }, []);

  const selectAddress = async (id) => {
    try {
      await axiosInstance.patch(`/address/update/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteAddress = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/address/delete-address/${id}`,
      );
      console.log(response);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-white/0.5backdrop-blur-sm z-40"
        onClick={hideAddress}
      />

      {/* Right Drawer */}
      <div className="fixed top-0 right-0 rounded-t-2xl h-screen w-[400px] bg-white shadow-2xl z-50">
        <button
          onClick={hideAddress}
          className="absolute top-5 right-6 text-3xl">
          &times;
        </button>

        <h2
          className="px-12 md:px-4 py-6 text-blue-600 font-bold flex items-center border-b-2 border-dashed mb-2 cursor-pointer"
          onClick={setCurrentLocation}>
          <BiCurrentLocation className="mr-2 text-xl" />
          Use my current location
        </h2>
        <div className="flex justify-between items-center px-4 mb-4">
          <h2 className="text-zinc-700 text-md font-bold px-8 md:px-2">
            Saved addresses
          </h2>
          <h2 className="text-blue-600 text-md font-bold">
            <Link to="/user/add_new_address">+ Add New</Link>
          </h2>
        </div>

        {loading ? (
          <SmallLoader />
        ) : adresses.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <p className="mb-4">You do not have any saved address</p>
            <img
              src="https://rukminim2.flixcart.com/www/268/230/promos/11/04/2025/17a5b305-a95b-452d-a9d6-c80d8ec4b037.png?q=60"
              alt="no_address"
              className="w-[130px] h-[120px]"
            />
          </div>
        ) : (
          <ul>
            {adresses.map((eachData) => (
              <AddressCart
                key={eachData.id}
                id={eachData.id}
                address={eachData}
                onDeleteAddress={onDeleteAddress}
                selectAddress={selectAddress}
                hideAddress={hideAddress}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default SelectAddress;
