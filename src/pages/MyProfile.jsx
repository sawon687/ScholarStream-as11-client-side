import React from 'react';
import UseAuth from '../Hook/UseAuth';
import { CgProfile } from "react-icons/cg";
import useRole from '../Hook/useRole';

const MyProfile = () => {
  const { user } = UseAuth();
  const {role}=useRole()

  return (
    <div className="flex justify-center items-start pt-10">
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-3xl border border-white/30 rounded-3xl shadow-xl p-8">
        {/* PROFILE IMAGE */}
        <div className="flex justify-center">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white/40 shadow-lg"
            />
          ) : (
            <CgProfile className="w-28 h-28 text-white/60" />
          )}
        </div>

        {/* NAME & EMAIL */}
        <div className="text-center mt-6">
          <h2 className="text-2xl font-extrabold text-white drop-shadow-md">
            {user?.displayName || "User Name"}
          </h2>
          <p className="text-white/80 mt-2">{user?.email || "user@example.com"}</p>
        </div>

        {/* ADDITIONAL INFO */}
        <div className="mt-8 space-y-4">
          <div className="flex justify-between bg-white/10 backdrop-blur-xl rounded-xl p-4 shadow-inner">
            <span className="font-medium text-white/80">Role</span>
            <span className="font-semibold text-white/90 capitalize">{role || "Student"}</span>
          </div>

          <div className="flex justify-between bg-white/10 backdrop-blur-xl rounded-xl p-4 shadow-inner">
            <span className="font-medium text-white/80">Joined On</span>
            <span className="font-semibold text-white/90">{user?.createdAt || "N/A"}</span>
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default MyProfile;
