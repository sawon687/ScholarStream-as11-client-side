import React, { useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../Hook/UseAuth';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const MyReviews = () => {
    const [reviewOpen, setReviewOpen] = useState(false)
    const [reviewData, setReviewData] = useState({})
    const axiosSecure = useAxiosSecure()
    const { user } = UseAuth();
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()
    const { data: review = [], refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews?email=${user?.email}`)
            return res.data
        }

    })
    // delete review
    const handleDelete = async (id) => {
Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async(result) => {
  if (result.isConfirmed) {
     const res = await axiosSecure.delete(`/reviews/${id}`)
       console.log(res.data)
        if (res.data.deletedCount) {
           
            refetch()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Reviews delete is  successfully",
                showConfirmButton: false,
                timer: 1500
            });
    
  }
        
        
        }
    }
)}

    //  edit review
    const handleUpdateReview = async (data,) => {
        console.log('data', data)

        const res = await axiosSecure.patch(`/reviews/${reviewData._id}`,data)

        console.log(res.data)
        if (res.data.modifiedCount) {
            refetch()
             setReviewOpen(false)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Reviews update is  successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Scholarship Name</th>
                            <th>University Name</th>
                            <th>Review Comment</th>
                            <th>Review Date</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            review.map((rev, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{rev.scholarshipName}</td>
                                <td>{rev.universityName}</td>
                                <td>{rev.reviewComment}</td>
                                <td>{rev.date}</td>
                                <td>{rev.rating}</td>
                                <td>
                                    <button onClick={() => {
                                        setReviewOpen(true)
                                        setReviewData(rev)
                                    }} className='btn mx-2'>edit</button>
                                    <button onClick={() => handleDelete(rev._id)} className='btn bg-red-400'>Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                reviewOpen && (
                    <dialog className="modal modal-open">
                        <div className="modal-box rounded-2xl">
                            <h3 className="font-bold text-lg">Add Review</h3>
                            <form onSubmit={handleSubmit(handleUpdateReview)} >

                                <div className="space-y-4 mt-4">
                                    <input

                                        type="number"
                                        min="1"
                                        max="5"
                                        placeholder="Rating (1-5)"
                                        className="input input-bordered w-full"
                                        defaultValue={reviewData.rating}
                                        {...register('rating')}
                                    />
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Comment"
                                        defaultValue={reviewData.reviewComment}
                                        {...register('userComment')}
                                    />
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button
                                        className="btn btn-outline"
                                        onClick={() => setReviewOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                )
            }
        </div>
    );
};

export default MyReviews;