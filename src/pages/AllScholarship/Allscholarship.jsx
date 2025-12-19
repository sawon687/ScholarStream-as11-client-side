import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import ScholarshipCard from "../../components/ScholarshipCard";
import UseAuth from "../../Hook/UseAuth";

const Allscholarship = () => {
  const { loading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  const { data = [], isLoading } = useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const res = await axiosSecure.get('/scholarships');
      return res.data;
    }
  });

  if (loading || isLoading) {
    return <h1 className='text-center text-5xl mt-20'>Loading...</h1>;
  }

  // Filter and search logic
  const filteredData = data.filter((scholarship) => {
    const matchesSearch =
      scholarship.scholarshipName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (scholarship.degree || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter
      ? scholarship.scholarshipCategory === categoryFilter
      : true;

    const matchesSubject = subjectFilter
      ? scholarship.subjectCategory === subjectFilter
      : true;

    return matchesSearch && matchesCategory && matchesSubject;
  });

  const uniqueCategories = [...new Set(data.map(d => d.scholarshipCategory).filter(Boolean))];
  const uniqueSubjects = [...new Set(data.map(d => d.subjectCategory).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-12 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Explore Scholarships
        </h1>
        <p className="mt-2 text-lg md:text-xl">
          Find top scholarships worldwide
        </p>
      </div>

      {/* Search Input */}
      <div className="max-w-[1400px] mx-auto px-6 py-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by Scholarship, University, Degree..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      {/* Category Filter as buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <button
          onClick={() => setCategoryFilter("")}
          className={`px-4 py-2 rounded-full border transition ${
            categoryFilter === "" ? "bg-indigo-500 text-white" : "bg-white border-gray-300"
          }`}
        >
          All Categories
        </button>
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              categoryFilter === cat ? "bg-indigo-500 text-white" : "bg-white border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Subject Filter as buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={() => setSubjectFilter("")}
          className={`px-4 py-2 rounded-full border transition ${
            subjectFilter === "" ? "bg-purple-500 text-white" : "bg-white border-gray-300"
          }`}
        >
          All Subjects
        </button>
        {uniqueSubjects.map((sub) => (
          <button
            key={sub}
            onClick={() => setSubjectFilter(sub)}
            className={`px-4 py-2 rounded-full border transition ${
              subjectFilter === sub ? "bg-purple-500 text-white" : "bg-white border-gray-300"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Cards Container */}
      <div className="max-w-[1400px] mx-auto px-6 pb-12">
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredData.map((scholarship) => (
              <ScholarshipCard key={scholarship._id} data={scholarship} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-16 text-xl">
            No scholarships found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Allscholarship;
