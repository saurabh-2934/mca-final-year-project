import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

import AddReview from "./AddReview";
import RatingSummary from "./RatingSummary";
import ReviewList from "./ReviewList";

function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(false);

  const getReviews = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(`/review/product/${productId}`);

      setReviews(response.data.reviews);
      setAverageRating(response.data.averageRating);
      setTotalReviews(response.data.totalReviews);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      getReviews();
    }
  }, [productId, getReviews]);

  return (
    <div className="mt-10 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Ratings & Reviews</h2>

      <RatingSummary
        averageRating={averageRating}
        totalReviews={totalReviews}
        reviews={reviews}
      />

      <div className="my-8 border-t"></div>

      <AddReview productId={productId} refreshReviews={getReviews} />

      <div className="my-8 border-t"></div>

      <ReviewList
        loading={loading}
        reviews={reviews}
        refreshReviews={getReviews}
      />
    </div>
  );
}

export default ReviewSection;
