import { FaStar } from 'react-icons/fa6';

const ScholarshipReviews = ({ review }) => {
  const rating = Math.round(Number(review.rating));

  return (
    <div className="p-2">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={review.userImage}
            alt={review.userName}
            className="w-14 h-14 rounded-full object-cover border-2 border-indigo-300 shadow-sm"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-900">{review.userName}</h4>
            <p className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Rating */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`transition-colors duration-300 ${
                  index < rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Comment */}
        <p className="text-gray-700 text-sm leading-relaxed">{review.reviewComment}</p>
      </div>
    </div>
  );
};

export default ScholarshipReviews;
