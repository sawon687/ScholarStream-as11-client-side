import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { button } from 'framer-motion/client';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [role, setRole] = useState('')
  const axiosSecure = useAxiosSecure()
  const { data: users = [],refetch } = useQuery({
    queryKey: ['users', role],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?role=${role}`)
      return res.data
    }
  })

  const handleUpdate = async (id, updateInfo) => {



    const res = await axiosSecure.patch(`/user/${id}`, updateInfo)
    console.log(res.data)
    if (res.data.modifiedCount) {
       refetch()
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your update user successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }





const handleDelete=async(id)=>{
    const res=await axiosSecure(`/user/${id}`)
    console.log(res.data)
}
  console.log(users)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          className="select select-bordered w-52"
          onClick={(e) => setRole(e.target.value)}

        >
          <option value="all">All Users</option>
          <option value="student">Student</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>

                <td className="capitalize">{user.role}</td>

                {/* Change Role */}
                <td>
                  {user.role !== "admin" && (
                    <button

                      onClick={() => handleUpdate(user?._id, { role: 'admin' })}
                      className="btn btn-sm btn-primary"
                    >
                      Make Admin
                    </button>
                  )}

                  {user.role !== "moderator" && (
                    <button

                      onClick={() => handleUpdate(user?._id, { role: 'moderator' })}


                      className="btn btn-sm btn-accent ml-2"
                    >
                      Make Moderator
                    </button>
                  )}
                </td>

                {/* Delete Button */}
                <td>
                  <button
                     onClick={()=> handleDelete(user?._id)}
                    className="btn btn-sm btn-error"
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

export default ManageUsers;