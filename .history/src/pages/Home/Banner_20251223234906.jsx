import React from 'react';
import { motion } from 'framer-motion';
import banner from '../../assets/banner.jpg';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="relative mt-25 py-24 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-xl overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 md:px-0">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
            Unlock Global Scholarships <br /> Easily
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Explore verified scholarships, apply seamlessly, and get one step closer to your dream education.
          </p>
          <Link to='allScholarship'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4  bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Search Scholarships
          </Link>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end"
        >
          <img
            src={banner}
            alt="Scholarship"
            className="w-full max-w-sm md:max-w-md rounded-3xl shadow-2xl object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
