import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UpdateScoloarship from './updateScolarship/UpdateScoloarship';
import Swal from 'sweetalert2';
import Loading from '../Loading';

const ManageScholarships = () => {
  const modalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [updatedata, setUpdatedata] = useState({});

  const { data = [], refetch, isLoading } = useQuery({
    queryKey: ['scholarships', 'manageScolarship'],
    queryFn: async () => {
      const res = await axiosSecure.get('/scholarships');
      return res.data?.scholarData;
    },
  });

  const handleupdate = (data) => {
    modalRef.current.showModal();
    setUpdatedata(data);
  };

  const handleDeletescholar = async (id) => {
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
        const res = await axiosSecure.delete(`/scholarships/${id}`);
        if (res.data.deletedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Scholarship deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen w-full p-6 text-white  flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Manage Scholarships</h2>
      
      <div className="w-full overflow-x-auto rounded-2xl shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
        <table className="min-w-full divide-y divide-white/20">
          <thead className=" text-white sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">#</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Scholarship Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Country</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Degree</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Deadline</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Service Charge</th>
              <th className="px-4 py-3 text-center text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item._id}
                className={`${
                  index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'
                } hover:bg-purple-700/20 transition duration-200`}
              >
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium">{item.scholarshipName}</td>
                <td className="px-4 py-3 text-sm">{item.universityCountry}</td>
                <td className="px-4 py-3 text-sm">{item.degree}</td>
                <td className="px-4 py-3 text-sm text-red-400 font-semibold">{item.applicationDeadline}</td>
                <td className="px-4 py-3 text-sm">{item.serviceCharge}$</td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <button
                    onClick={() => handleupdate(item)}
                    className="px-3 py-1 rounded-md bg-purple-600/80 hover:bg-purple-600 text-white font-medium text-sm transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeletescholar(item._id)}
                    className="px-3 py-1 rounded-md bg-red-600/80 hover:bg-red-600 text-white font-medium text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-white/80">
                  No scholarships found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Update Scholarship Modal */}
      <UpdateScoloarship updatedata={updatedata} modalRef={modalRef} refetch={refetch} />
    </div>
  );
};

export default ManageScholarships;
