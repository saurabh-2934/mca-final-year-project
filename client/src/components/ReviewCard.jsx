import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { FaStar, FaTrash } from "react-icons/fa";

function ReviewCard({ review, refreshReviews }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const isOwner = user?._id === review.user?._id;

  const deleteReview = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?",
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/review/delete/${review._id}`);

      toast.success("Review deleted successfully.");

      refreshReviews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="border rounded-xl p-5 hover:shadow-md transition">
      {/* Header */}

      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {/* Avatar */}

          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg uppercase">
            {review.user?.fullName?.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-zinc-800">
              {review.user?.fullName}
            </h3>

            <p className="text-gray-500 text-sm">
              {new Date(review.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {isOwner && (
          <button
            onClick={deleteReview}
            className="text-red-500 hover:text-red-700 transition">
            <FaTrash />
          </button>
        )}
      </div>

      {/* Rating */}

      <div className="flex items-center mt-4">
        <div className="bg-green-600 text-white flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold">
          {review.rating}

          <FaStar className="text-xs" />
        </div>
      </div>

      {/* Comment */}

      <p className="mt-4 text-gray-700 leading-7">
        {review.comment || "No comment provided."}
      </p>
    </div>
  );
}

export default ReviewCard;
