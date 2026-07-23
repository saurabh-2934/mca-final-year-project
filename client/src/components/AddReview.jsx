import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";

function AddReview({ productId, refreshReviews }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (rating === 0) {
      return toast.error("Please select a rating.");
    }

    try {
      setLoading(true);

      await axiosInstance.post("/review/create", {
        product: productId,
        rating,
        comment,
      });

      toast.success("Review added successfully.");

      setRating(0);
      setHover(0);
      setComment("");

      refreshReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-5">
      <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

      {/* Rating */}

      <div className="flex items-center gap-2 mb-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={32}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={`cursor-pointer transition ${
              star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}

        <span className="ml-2 text-gray-600 font-medium">
          {rating > 0 ? `${rating}/5` : ""}
        </span>
      </div>

      {/* Comment */}

      <textarea
        rows={5}
        placeholder="Share your experience with this product..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-lg p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Button */}

      <button
        onClick={submitReview}
        disabled={loading}
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition disabled:opacity-50">
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}

export default AddReview;
