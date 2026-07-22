import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import ShowPopup from "./ShowPopup";

const bankOffer = [
  {
    id: "b1",
    name: "Axix Bank",
    offer: 10,
    type: "Credit Card",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYyD67iTPnPJkxgWYjlQNzSaBTSplGOljltSKnBk8_dqeS8GFn_ccEqc&s=10",
  },
  {
    id: "b2",
    name: "HDFC Bank",
    offer: 7,
    type: "Credit Card",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZOFb8Z31QcHES61KFkeaM0dUMD05-zli92p1lAteEcmk6xLvhbK_NYsU&s=10",
  },
  {
    id: "b3",
    name: "PhonePay",
    offer: 5,
    type: "UPI",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSaZ_s86cW8e0zC1OudrugKOnoyyvdouI7TBhFr2sN3g&s=10",
  },
  {
    id: "b4",
    name: "Paytm",
    offer: 5,
    type: "UPI",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQghxK6s7C8oRHEcURuVa_YRuBXbg9ZHibbBnCr-BhDha-AxNSZLbte_CH&s=10",
  },
  {
    id: "b5",
    name: "GooglePay",
    offer: 2,
    type: "UPI",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3E4omyZ5zWFVGrRjXphn0A9_Fr-y6jpBeFW-08skjVQ&s",
  },
  {
    id: "b6",
    name: "ICICI Bank",
    offer: 10,
    type: "Debit Card",
    icon: "https://play-lh.googleusercontent.com/phYnOiNG8bO3efDyipi1-a0AzqKtpWVPESAwLuqnqc8h9jXswVmivA9jlvmqD-Xdey05Oi2srXDP484WIMFH",
  },
];

function CardOfferSection({ price, withBankOffer }) {
  const [showOffer, setShowOffer] = useState(false);
  const [offerApplied, setOfferAppied] = useState(true);
  const [offerId, setOfferId] = useState("");
  const [showOfferDetails, setShowOfferDetails] = useState(false);
  const [cashbackDetails, setCashbackDetails] = useState({});

  const offerSelected = bankOffer.filter((eachData) => eachData.id === offerId);

  const onClickApply = (id) => {
    const selectedOffer = bankOffer.find((offer) => offer.id === id);
    setOfferAppied(false);
    setOfferId(id);

    withBankOffer(
      price - Math.round((price * selectedOffer.offer) / 100),
      selectedOffer.offer,
    );
  };

  const removeOffer = () => {
    setOfferAppied(!offerApplied);
    setOfferId("");
    withBankOffer(price, 0);
  };

  const hideOfferDetails = () => {
    setCashbackDetails(null);
    setShowOfferDetails(false);
  };

  const onClickCashback = (data) => {
    setShowOfferDetails(true);
    setCashbackDetails(data);
  };

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-b from-blue-700 to-blue-800 rounded-[20px]">
        <div className="flex justify-between items-center px-6 py-1">
          <div className="flex items-center">
            <img src="/wowDeal.png" alt="wow_deal" className="mr-4" />
            <div>
              {showOffer ? (
                <p className="text-white text-left font-semibold text-sm md:text-base ">
                  Apply offer for maximum savings!
                </p>
              ) : (
                <p className="text-white text-left font-bold text-xl">
                  Buy at ₹
                  {Math.round(price - price * 0.1).toLocaleString("en-IN")}
                </p>
              )}
              {/*10% off*/}
            </div>
          </div>
          <IoChevronDown
            onClick={() => setShowOffer(!showOffer)}
            className={`text-xl text-right cursor-pointer text-white transition-transform duration-300 ${
              showOffer ? "rotate-180" : ""
            }`}
          />
        </div>
        <div
          className={`rounded-2xl bg-sky-50 p-2 ${showOffer && "border-[1px] border-sky-400"}`}>
          {!showOffer && (
            <p className="text-left text-gray-700 text-sm px-2">
              Apply offer for maximum savings!
            </p>
          )}
          {showOffer &&
            (offerApplied ? (
              <div className="bg-white rounded-md p-2 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-zinc-500 font-bold text-md">
                    Bank Offers
                  </h2>
                  <h2 className="text-zinc-700 font-bold text-md">
                    Choose Best Offer!
                  </h2>
                </div>
                <ul className="flex flex-col overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4">
                  {bankOffer.map((eachData) => (
                    <li
                      key={eachData.id}
                      className="min-w-full snap-center border-[1px] border-gray-400 rounded-md">
                      <div className="flex justify-between p-2">
                        <div className="flex items-start">
                          <img
                            src={eachData.icon}
                            alt={eachData.name}
                            className="w-[50px] h-[25] mr-4"
                          />
                          <div className="flex flex-col w-fit text-left">
                            <h2 className="font-bold text-zinc-600 text-lg">
                              Save upto{" "}
                              {Math.round(
                                (price * eachData.offer) / 100,
                              ).toLocaleString("en-IN")}
                            </h2>
                            <p className="text-zinc-600 text-md">
                              {eachData.name}
                            </p>
                          </div>
                        </div>
                        <h2
                          className="text-blue-500 text-xl font-bold cursor-pointer"
                          onClick={() => onClickApply(eachData.id)}>
                          Apply
                        </h2>
                      </div>
                      <div className="bg-gray-100 px-4 rounded-b-md text-left flex justify-between items-center">
                        <h2 className="text-zinc-700 font-bold text-md">
                          {eachData.type} . Cashback
                        </h2>

                        <FaChevronRight
                          className="text-sm text-gray-400 cursor-pointer"
                          onClick={() => onClickCashback(eachData)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                {showOfferDetails && (
                  <ShowPopup
                    hideOfferDetails={hideOfferDetails}
                    offerDetails={cashbackDetails}
                    price={price}
                    onClickApply={onClickApply}
                  />
                )}
              </div>
            ) : (
              <div className="flex justify-between">
                <h2 className="text-gray-500 text-md font-bold flex items-center">
                  <IoIosCheckmarkCircle className="text-green-600 mr-2" />
                  {offerSelected[0].name}{" "}
                  <span className="text-zinc-800 ml-2 font-semibold">
                    ₹
                    {Math.round(
                      (price * offerSelected[0].offer) / 100,
                    ).toLocaleString("en-IN")}{" "}
                    off
                  </span>
                </h2>
                <h2
                  className="text-gray-500 text-md font-bold cursor-pointer"
                  onClick={removeOffer}>
                  Remove
                </h2>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CardOfferSection;
