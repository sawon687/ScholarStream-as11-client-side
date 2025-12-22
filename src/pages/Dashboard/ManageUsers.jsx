import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../Loading';

const ManageUsers = () => {
  const [role, setRole] = useState('all');
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users', role],
    queryFn: async () => {
      const queryRole = role === 'all' ? '' : role;
      const res = await axiosSecure.get(`/user${queryRole ? `?role=${queryRole}` : ''}`);
      return res.data;
    }
  });

  const handleUpdate = async (id, updateInfo) => {
              console.log(updateInfo)
    try {
      const res = await axiosSecure.patch(`/user/${id}`, updateInfo);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User role updated successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update user role!"
      });
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/user/${id}`);
        if (res.data.deletedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User deleted successfully",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to delete user!"
        });
      }
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen w-full p-6  text-white flex flex-col items-center">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6 text-center w-full">Manage Users</h1>

      {/* Filter dropdown left side */}
      <div className="w-full flex justify-start mb-6">
        <select
          className="px-16 py-2 rounded-lg bg-white/20 border border-white/40 text-white focus:outline-none hover:bg-white/30 transition"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="all" className="text-black">All Users</option>
          <option value="student" className="text-black">Student</option>
          <option value="moderator" className="text-black">Moderator</option>
          <option value="admin" className="text-black">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="w-full overflow-x-auto rounded-2xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20">
        <table className="min-w-full divide-y divide-white/20">
          <thead className="bg-purple-800/80 sticky top-0 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-base font-semibold">#</th>
              <th className="px-6 py-3 text-left text-base font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-base font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-base font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-base font-semibold">Change Role</th>
              <th className="px-6 py-3 text-left text-base font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${index % 2 === 0 ? 'bg-white/5' : 'bg-white/10'} hover:bg-purple-700/30 transition`}
              >
                <td className="px-6 py-3 text-sm">{index + 1}</td>
                <td className="px-6 py-3 text-sm">{user.name}</td>
                <td className="px-6 py-3 text-sm">{user.email}</td>
                <td className="px-6 py-3 text-sm capitalize">{user.role}</td>

                {/* Change Role */}
                <td className="px-6 py-3 flex flex-wrap gap-2">
                  {user.role === 'student' && (
                    <>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'moderator' })}
                        className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                      >
                        Make Moderator
                      </button>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'admin' })}
                        className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm transition"
                      >
                        Make Admin
                      </button>
                    </>
                  )}
                  {user.role === 'moderator' && (
                    <>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'student' })}
                        className="px-3 py-1 rounded-md bg-yellow-600 hover:bg-yellow-700 text-white text-sm transition"
                      >
                        Demote Student
                      </button>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'admin' })}
                        className="px-3 py-1 rounded-md bg-green-600 hover:bg-green-700 text-white text-sm transition"
                      >
                        Promote Admin
                      </button>
                    </>
                  )}
                  {user.role === 'admin' && (
                    <>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'moderator' })}
                        className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                      >
                        Demote Moderator
                      </button>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'student' })}
                        className="px-3 py-1 rounded-md bg-yellow-600 hover:bg-yellow-700 text-white text-sm transition"
                      >
                        Demote Student
                      </button>
                    </>
                  )}
                </td>

                {/* Delete */}
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-6 text-center text-white/80">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
