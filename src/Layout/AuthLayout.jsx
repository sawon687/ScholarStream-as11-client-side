import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../components/Logo/Logo';
import Auth from '../assets/auth.jpg';
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      
      {/* Logo */}
      <div className="py-6 px-6 md:px-12">
        <Logo />
      </div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row items-center justify-center mx-auto w-full max-w-[1200px] bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-6 md:p-12 gap-6 md:gap-12"
      >
        {/* Form Section */}
        <div className="flex-1 w-full max-w-md">
          <Outlet />
        </div>

        {/* Image Section */}
        <div className="flex-1 w-full flex justify-center items-center">
          <img
            src={Auth}
            alt="Authentication"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>
      </motion.div>
      
      {/* Footer Gradient Shadow */}
      <div className="mt-10 w-full h-20 bg-gradient-to-t from-purple-200 to-transparent"></div>
    </div>
  );
};

export default AuthLayout;
