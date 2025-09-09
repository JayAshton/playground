export function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-white mb-4">Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-400">No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review, idx) => (
            <li key={idx} className="bg-gray-800 rounded-lg p-4 shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400 font-semibold">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </span>
              </div>
              <p className="text-gray-200">{review.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}