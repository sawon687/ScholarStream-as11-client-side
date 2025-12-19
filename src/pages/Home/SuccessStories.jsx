import React from 'react';
import { motion } from 'framer-motion';

const stories = [
  {
    name: 'John Doe',
    text: 'I got a full scholarship to study abroad thanks to this platform!',
  },
  {
    name: 'Jane Smith',
    text: 'The process was so easy and I found the perfect scholarship.',
  },
];

const SuccessStories = () => {
  return (
    <div className="bg-gray-100 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Success Stories</h2>
      <div className="max-w-[1000px] mx-auto flex flex-col gap-8">
        {stories.map((story, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <p className="text-gray-700 mb-2">"{story.text}"</p>
            <p className="font-bold text-indigo-600">{story.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
