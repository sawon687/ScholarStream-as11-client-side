import React, { useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../Hook/UseAuth';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import Loading from '../Loading';

const MyReviews = () => {
    const [reviewOpen, setReviewOpen] = useState(false);
    const [reviewData, setReviewData] = useState({});
    const axiosSecure = useAxiosSecure();
    const { user, loading } = UseAuth();

    const { register, handleSubmit } = useForm();

    const { data: review = [], refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
            return res.data;
        },
    });

    // Delete review
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reviews/${id}`);
                if (res.data.deletedCount) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Review deleted successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };

    // Update review
    const handleUpdateReview = async (data) => {
        const res = await axiosSecure.patch(`/reviews/${reviewData._id}`, data);
        if (res.data.modifiedCount) {
            refetch();
            setReviewOpen(false);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Review updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="space-y-6">
            {/* Glass Table */}
            <div className="overflow-x-auto bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg">
                <table className="table w-full text-white">
                    <thead className="bg-white/10">
                        <tr>
                            <th>#</th>
                            <th>Scholarship Name</th>
                            <th>University Name</th>
                            <th>Review Comment</th>
                            <th>Review Date</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {review.map((rev, index) => (
                            <tr key={rev._id} className="hover:bg-white/20 transition-all duration-200">
                                <th>{index + 1}</th>
                                <td>{rev.scholarshipName}</td>
                                <td>{rev.universityName}</td>
                                <td>{rev.reviewComment}</td>
                                <td>{rev.date}</td>
                                <td>{rev.rating}</td>
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setReviewOpen(true);
                                            setReviewData(rev);
                                        }}
                                        className="btn btn-sm bg-indigo-500 hover:bg-indigo-600 shadow-md text-white"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(rev._id)}
                                        className="btn btn-sm bg-red-500 hover:bg-red-600 shadow-md text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Glass Modal */}
            {reviewOpen && (
                <dialog className="modal modal-open">
                    <div className="modal-box bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                        <h3 className="font-bold text-lg text-white">Edit Review</h3>
                        <form onSubmit={handleSubmit(handleUpdateReview)} className="space-y-4 mt-4">
                            <input
                                type="number"
                                min="1"
                                max="5"
                                placeholder="Rating (1-5)"
                                defaultValue={reviewData.rating}
                                {...register('rating')}
                                className="input input-bordered w-full bg-white/10 text-white border-white/20 placeholder-white/60"
                            />
                            <textarea
                                placeholder="Comment"
                                defaultValue={reviewData.reviewComment}
                                {...register('userComment')}
                                className="textarea textarea-bordered w-full bg-white/10 text-white border-white/20 placeholder-white/60"
                            />
                            <div className="modal-action flex justify-end gap-2">
                                <button type="submit" className="btn btn-primary bg-indigo-500 hover:bg-indigo-600 text-white">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline text-white border-white/30 hover:bg-white/10"
                                    onClick={() => setReviewOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyReviews;
