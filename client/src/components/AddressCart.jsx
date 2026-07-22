import { GrLocation } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

function AddressCart({ address, onDeleteAddress, selectAddress, hideAddress }) {
  const onClickAddress = (id) => {
    selectAddress(id);
    localStorage.setItem("current_address", JSON.stringify(address));
    hideAddress();
  };

  return (
    <div
      className="flex justify-between items-start px-8 md:px-4 mb-4 cursor-pointer"
      onClick={() => onClickAddress(address.id)}>
      <div className="flex flex-col items-start pl-4 md:px-4 w-full">
        <p className="w-fit bg-zinc-200 text-zinc-500 text-sm px-2 py-1 rounded-md font-bold mb-2">
          {address.addressType}
        </p>
        <div className="flex items-center mb-2">
          <h2 className="text-md text-zinc-800 font-bold flex items-center mr-2">
            <GrLocation className="text-gray-900 mr-2" />
            {address.fullName.toUpperCase()}
          </h2>
          {address.isDefault && (
            <p className="w-fit bg-sky-100 text-blue-600 text-sm px-2 py-1 rounded-md font-bold">
              Selected
            </p>
          )}
        </div>
        <p className="text-zinc-500 text-sm text-left">{`${address.area}, ${address.locality}, ${address.city}, ${address.pincode}`}</p>
      </div>
      <button
        type="button"
        className="bg-tranparent text-lg text-zinc-500"
        onClick={() => onDeleteAddress(address.id)}>
        <MdDelete />
      </button>
    </div>
  );
}

export default AddressCart;
