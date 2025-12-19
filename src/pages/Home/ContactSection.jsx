import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <div className="py-16 bg-indigo-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Us</h2>
      <div className="max-w-[800px] mx-auto flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="font-bold text-lg mb-2">Email</h3>
          <p>support@scholarships.com</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h3 className="font-bold text-lg mb-2">Phone</h3>
          <p>+880 1234 567 890</p>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
