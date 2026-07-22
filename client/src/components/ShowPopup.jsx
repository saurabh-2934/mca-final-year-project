import formatDateWithDay from "../utils/getDate";

function ShowPopup({ hideOfferDetails, offerDetails, price, onClickApply }) {
  const today = new Date();

  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const onClickCashBack = (id) => {
    hideOfferDetails();
    onClickApply(id);
  };
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-white/0.5backdrop-blur-sm z-40"
        onClick={hideOfferDetails}
      />

      {/* Right Drawer */}
      <div className="fixed top-0 right-0 rounded-t-2xl h-screen w-[400px] bg-white shadow-2xl z-50">
        <button
          onClick={hideOfferDetails}
          className="absolute top-5 right-6 text-3xl">
          &times;
        </button>

        <div className="">
          <div className="text-left px-8 md:px-4 py-1 border-b-[1px] border-gray-500">
            <h2 className="font-bold text-lg text-gray-500">
              {offerDetails.name}
            </h2>
            <div className="flex items-center">
              <img
                src={offerDetails.icon}
                alt={offerDetails.name}
                className="w-[50px] h-[45px] mr-4"
              />
              <div>
                <h2 className="font-bold text-3xl text-zinc-700">
                  {" "}
                  ₹
                  {Math.round(
                    (price * offerDetails.offer) / 100,
                  ).toLocaleString("en-IN")}{" "}
                  <span>off</span>
                </h2>
                <p className="text-zinc-500 text-lg">{offerDetails.type}</p>
              </div>
            </div>
          </div>
          <ul className="list-disc pl-5 text-left pl-16 md:px-8 py-4">
            <li className="text-zinc-600 text-sm mb-4 font-semibold">
              Cashback Offer
            </li>
            <li className="text-zinc-600 text-sm mb-4 font-semibold">
              Cashback will be credited to your card/bank after the return
              periods ends.
            </li>
            <li className="text-zinc-600 text-sm mb-4 font-semibold">
              Valid till {formatDateWithDay(lastDay)}, 11:59 PM until stock
              lasts.
            </li>
            <li className="text-zinc-600 text-sm mb-8 font-semibold">
              On every offer terms and conditons are applied.
            </li>
            <button
              className="w-full bg-blue-700 text-white font-semibold text-xl ml-[-14px] md:ml-0 rounded-xl py-2"
              onClick={() => onClickCashBack(offerDetails.id)}>
              Apply offer
            </button>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ShowPopup;
