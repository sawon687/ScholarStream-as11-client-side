import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../Loading";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all reviews
  const { data: reviews = [], refetch, isLoading } = useQuery({
    queryKey: ["reviews", "Moderator"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
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
      confirmButtonText: "Yes, delete it!",
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
            timer: 1500,
          });
        }
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-white/10 backdrop-blur-3xl rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
        All Reviews
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-inner">
        <table className="table w-full text-white">
          <thead className="bg-white/20 backdrop-blur-xl text-white">
            <tr>
              <th>#</th>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Review Comment</th>
              <th>Review Date</th>
              <th>Rating</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev, index) => (
              <tr key={rev._id} className="hover:bg-white/10 transition-all">
                <td>{index + 1}</td>
                <td>{rev.scholarshipName}</td>
                <td>{rev.universityName}</td>
                <td className="text-sm">{rev.reviewComment}</td>
                <td>{rev.date}</td>
                <td>{rev.rating}</td>
                <td className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => handleDelete(rev._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviews;
