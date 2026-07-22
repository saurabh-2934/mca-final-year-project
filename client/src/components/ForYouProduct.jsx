import { IoStar } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

function ForYouProduct({ title, products, c1, c2 }) {
  const gradients1 = {
    blue: "from-blue-100",
    yellow: "from-yellow-100",
    purple: "from-purple-100",
    green: "from-green-100",
    red: "from-red-100",
    sky: "from-sky-100",
  };
  const gradients2 = {
    blue: "to-blue-100",
    yellow: "to-yellow-100",
    purple: "to-purple-100",
    green: "to-green-100",
    red: "to-red-100",
    sky: "to-sky-100",
  };
  return (
    <div
      className={`bg-gradient-to-b ${gradients1[c1]} ${gradients2[c2]} rounded-lg mb-4`}>
      <h1 className="text-2xl text-gray-600 font-bold p-4 text-left">
        {title}
      </h1>

      <div className="overflow-x-auto scrollbar-hide">
        <ul className="flex gap-4 p-4">
          {products.map((eachData) => (
            <Link
              to={`/product/${eachData.id}`}
              className="w-full md:min-w-[250px] md:max-w-[250px] flex-shrink-0 cursor-pointer">
              <li key={eachData.id}>
                <div className="bg-white rounded-md p-4">
                  <img
                    src={eachData.images[0]}
                    alt={eachData.name}
                    className="w-full h-48 object-contain"
                  />
                  <p className="flex items-center p-2 shadow-md w-fit rounded-sm text-gray-800 font-semibold">
                    {eachData.rating} <IoStar className="ml-2 text-green-700" />
                  </p>
                </div>

                <p className="mt-2 truncate font-medium">{eachData.name}</p>
                <div className="flex items-center">
                  {eachData.discount !== 0 && (
                    <p className="flex items-center line-through text-gray-500 text-md font-semibold">
                      <FaRupeeSign className="text-sm" />
                      {eachData.price.toLocaleString("en-IN")}
                    </p>
                  )}
                  <p className="text-gray-700 text-md font-semibold ml-2">
                    {Math.round(
                      Number(eachData.price) -
                        (Number(eachData.price) * Number(eachData.discount)) /
                          100,
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ForYouProduct;
