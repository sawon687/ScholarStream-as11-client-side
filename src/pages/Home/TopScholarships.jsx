import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import ScholarshipCard from '../../components/ScholarshipCard';
import { motion } from 'framer-motion';

const TopScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const { data = [], isLoading } = useQuery({
    queryKey: ['scholarships', 'topScholarship'],
    queryFn: async () => {
      const res = await axiosSecure.get('/scholarships');
      return res.data.scholarData;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading Top Scholarships...</p>;

  return (
    <div className="max-w-[1400px]  my-10 rounded-2xl bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 mx-auto px-6 py-20">
      <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">
        Featured Scholarships
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.slice(0, 6).map((scholarship) => (
          <motion.div
            key={scholarship._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hover:scale-105 transition-transform duration-300"
          >
            <ScholarshipCard data={scholarship} showViewDetails={true} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopScholarships;
