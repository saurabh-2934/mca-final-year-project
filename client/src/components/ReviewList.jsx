import ReviewCard from "./ReviewCard";

function ReviewList({ reviews, loading, refreshReviews }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <p className="text-gray-500 text-lg">Loading reviews...</p>
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <div className="text-center py-16 border rounded-xl bg-gray-50">
        <h2 className="text-2xl font-semibold text-zinc-700">No Reviews Yet</h2>

        <p className="text-gray-500 mt-3">
          Be the first person to review this product.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Customer Reviews ({reviews.length})
      </h2>

      <div className="space-y-5">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            refreshReviews={refreshReviews}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
