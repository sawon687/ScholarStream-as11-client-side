import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <div className="py-20 rounded-2xl bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-800">
        Contact Us
      </h2>

      <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-3xl shadow-lg flex items-center gap-4 hover:shadow-2xl transition-all duration-300"
        >
          <div className="p-4 rounded-xl bg-indigo-100">
            <FaEnvelope size={28} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1 text-gray-800">Email</h3>
            <p className="text-gray-600">support@scholarships.com</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8  rounded-3xl shadow-lg flex items-center gap-4 hover:shadow-2xl transition-all duration-300"
        >
          <div className="p-4 rounded-xl bg-indigo-100">
            <FaPhone size={28} className="text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1 text-gray-800">Phone</h3>
            <p className="text-gray-600">+880 1234 567 890</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
