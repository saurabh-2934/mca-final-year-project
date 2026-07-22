import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className="text-green-600" />
      ))}

      {halfStar && <FaStarHalfAlt className="text-green-600" />}

      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="text-green-600" />
      ))}
      <p className="text-green-600 text-sm text-poppins ml-2">{rating}</p>
    </div>
  );
};

export default Rating;
