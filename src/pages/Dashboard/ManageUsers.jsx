import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [role, setRole] = useState('all');
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users', role],
    queryFn: async () => {
      const queryRole = role === 'all' ? '' : role;
      const res = await axiosSecure.get(`/user${queryRole ? `?role=${queryRole}` : ''}`);
      return res.data;
    }
  });

  const handleUpdate = async (id, updateInfo) => {
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <select
          className="select select-bordered w-52"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="student">Student</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
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
                <td className="flex flex-wrap gap-2">
                  {user.role === 'student' && (
                    <>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'moderator' })}
                        className="btn btn-sm btn-accent"
                      >
                        Make Moderator
                      </button>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'admin' })}
                        className="btn btn-sm btn-primary"
                      >
                        Make Admin
                      </button>
                    </>
                  )}

                  {user.role === 'moderator' && (
                    <>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'student' })}
                        className="btn btn-sm btn-warning"
                      >
                        Demote to Student
                      </button>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'admin' })}
                        className="btn btn-sm btn-primary"
                      >
                        Promote to Admin
                      </button>
                    </>
                  )}

                  {user.role === 'admin' && (
                    <>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'moderator' })}
                        className="btn btn-sm btn-accent"
                      >
                        Demote to Moderator
                      </button>
                      <button
                        onClick={() => handleUpdate(user._id, { role: 'student' })}
                        className="btn btn-sm btn-warning"
                      >
                        Demote to Student
                      </button>
                    </>
                  )}
                </td>

                {/* Delete Button */}
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
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
