import React from 'react';
import { motion } from "framer-motion";
import banner from '../../assets/banner.jpg'
const Banner = () => {
    return (
        <>
            <div className="py-16 bg-gradient-to-r rounded-3xl border-2 border-gray-300 from-blue-100 to-white">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE -------------------------------------------------- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
            Find The Best Scholarships<br/> Worldwide
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Discover verified scholarships, apply easily,
            and take one step closer to your dream education.
          </p>

          <button className="btn btn-primary mt-6">
            Search Scholarship
          </button>
        </motion.div>

        {/* RIGHT SIDE ------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <img
            src={banner}
            alt="Scholarship"
            className="w-[400px] h-full rounded-xl shadow-md"
          />
        </motion.div>

      </div>
    </div>
        </>
    );
};

export default Banner;