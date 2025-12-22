import React from 'react';
import { motion } from 'framer-motion';

const stories = [
  { name: 'John Doe', text: 'I got a full scholarship abroad thanks to this platform!' },
  { name: 'Jane Smith', text: 'The process was smooth and easy.' },
  { name: 'Alice Johnson', text: 'Applied to multiple scholarships with zero hassle.' },
  { name: 'Michael Brown', text: 'Highly recommended for global scholarships seekers.' },
];

const SuccessStories = () => {
  return (
    <div className="py-20 my-12 rounded-2xl bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-800">
        Success Stories
      </h2>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <p className="text-gray-700 mb-4 text-lg italic">"{story.text}"</p>
            <p className="font-bold text-indigo-600 text-right">- {story.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
