import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const AllReviews = () => {
    const axiosSecure = useAxiosSecure()
    //   all review loaded
    const { data: review = [], refetch } = useQuery({
        queryKey: ['reviews', 'Moderator'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews`)
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
        }).then(async (result) => {
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
        )
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

                                    <button onClick={() => handleDelete(rev._id)} className='btn bg-red-400'>Delete</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;