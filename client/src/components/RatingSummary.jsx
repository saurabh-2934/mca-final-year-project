import { FaStar } from "react-icons/fa";

function RatingSummary({ averageRating, totalReviews, reviews }) {
  const getCount = (rating) => {
    return reviews.filter((review) => review.rating === rating).length;
  };

  const getPercentage = (rating) => {
    if (totalReviews === 0) return 0;
    return (getCount(rating) / totalReviews) * 100;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left Side */}

      <div>
        <h2 className="text-6xl font-bold text-zinc-800">
          {averageRating.toFixed(1)}
        </h2>

        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`text-xl ${
                star <= Math.round(averageRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-gray-500 mt-2">
          Based on {totalReviews} review
          {totalReviews !== 1 && "s"}
        </p>
      </div>

      {/* Right Side */}

      <div className="space-y-4">
        {[5, 4, 3, 2, 1].map((star) => (
          <div key={star} className="flex items-center gap-3">
            <div className="flex items-center w-12">
              <span className="font-semibold">{star}</span>
              <FaStar className="text-yellow-400 ml-1 text-sm" />
            </div>

            <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-green-500 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${getPercentage(star)}%`,
                }}
              />
            </div>

            <span className="w-10 text-right text-gray-600 text-sm">
              {getCount(star)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingSummary;
