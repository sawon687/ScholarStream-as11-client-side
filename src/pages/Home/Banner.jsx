import React from 'react';
import { motion } from 'framer-motion';
import banner from '../../assets/banner.jpg';

const Banner = () => {
  return (
    <div className="relative py-20 z-20 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6 md:px-0">

        {/* LEFT SIDE: Hero Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
            Find The Best Scholarships <br /> Worldwide
          </h1>

          <p className="text-gray-600 text-lg md:text-xl">
            Discover verified scholarships, apply easily, and take one step closer to your dream education.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition"
          >
            Search Scholarship
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end"
        >
          <img
            src={banner}
            alt="Scholarship"
            className="w-full max-w-sm md:max-w-md rounded-xl shadow-2xl object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
