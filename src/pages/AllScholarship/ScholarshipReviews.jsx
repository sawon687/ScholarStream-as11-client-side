
import { FaStar } from 'react-icons/fa6';

const ScholarshipReviews = ({ review }) => {

    console.log('reviews data', review)
    const rating = Math.round(Number(review.rating));
    return (
        <div>
            <div className="bg-base-200 rounded-2xl p-5 shadow">
                {/* Header */}

                <div className="flex items-center gap-4 mb-3">
                    <img
                        src={review.userImage}
                        className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex-1">
                        <h4 className="font-semibold">{review.userName}</h4>
                        <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1">
                        {

                            [...Array(5)].map((_, index) => <FaStar key={index} className={index < rating ? "text-yellow-400" : "text-gray-300"} />)}



                    </div>
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed">
                    {review.reviewComment}
                </p>
            </div>




        </div>
    );
};

export default ScholarshipReviews;