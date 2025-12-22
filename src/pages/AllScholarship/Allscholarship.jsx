import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import ScholarshipCard from "../../components/ScholarshipCard";
import UseAuth from "../../Hook/UseAuth";
import { useForm } from "react-hook-form";
import Loading from "../Loading";
import { useLocation } from "react-router";
import { motion } from "framer-motion";

const Allscholarship = () => {
  const { loading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [scholarship, setScholarData] = useState([]);
  const [totalScholarship, setTotalScholarship] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    Number(localStorage.getItem("page")) || 1
  );
  const [totalPage, setTotalPage] = useState(0);
  const limit = 8;
 console.log('subject',subjectFilter)
  useEffect(() => {
    localStorage.setItem("page", currentPage);
  }, [currentPage]);

  const { data = {}, isLoading } = useQuery({
    queryKey: ["scholarships", searchText, currentPage, categoryFilter, subjectFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/scholarships?search=${searchText}&limit=${limit}&skip=${(currentPage - 1) * limit}&category=${categoryFilter}&subject=${subjectFilter}`
      );
      return res.data;
    },
  });

  // Restore page if coming back from details page
  useEffect(() => {
    if (location.state?.page) setCurrentPage(location.state.page);
  }, [location.state]);

  // Update scholarship data when query changes
  useEffect(() => {
    if (data?.scholarData) {
      setScholarData(data.scholarData);
      setTotalScholarship(data.totalScholar || 0);
      setTotalPage(Math.ceil((data.totalScholar || 0) / limit));
    }
  }, [data]);

  const { register, handleSubmit } = useForm();

  if (loading || isLoading) return <Loading />;

  const handleSearch = (formData) => {
    setSearchText(formData.searchtext || "");
    setCurrentPage(1);
  };

  return (
    <>
      {/* Banner */}
      <div className="relative mt-25 mb-12 py-32 px-6 text-center bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 rounded-b-3xl shadow-2xl overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Explore Scholarships
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
          Discover top scholarships worldwide and advance your education.
        </p>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-teal-300/20 to-blue-300/20 rounded-b-3xl pointer-events-none"></div>
      </div>

      <div className="min-h-screen pb-16 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50">
        {/* Search */}
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex justify-center">
          <form onSubmit={handleSubmit(handleSearch)} className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Search by Scholarship, University, Degree..."
              {...register("searchtext")}
              className="w-full md:w-2/3 lg:w-1/2 px-6 py-4 rounded-full shadow-2xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-cyan-400 text-lg transition duration-300 bg-white/90 backdrop-blur-md placeholder-gray-400"
            />
          </form>
        </div>

        {/* Filters */}
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-wrap gap-4 justify-center">
          <select
            className="rounded-full border border-gray-300 px-6 py-2 shadow-lg hover:shadow-xl transition duration-300 bg-white/90 backdrop-blur-md"
            value={categoryFilter}
            onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">All Categories</option>
            <option value="Full Funded">Full Funded</option>
            <option value="Partial">Partial</option>
            <option value="Self Fund">Self Fund</option>
          </select>

          <select
            className="rounded-full border border-gray-300 px-6 py-2 shadow-lg hover:shadow-xl transition duration-300 bg-white/90 backdrop-blur-md"
            value={subjectFilter}
            onChange={(e) => { setSubjectFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="">All Subjects</option>
            <option value="Science">Science</option>
            <option value="Arts and Humanities">Arts and Humanities</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        {/* Scholarship Cards */}
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          {scholarship?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {scholarship.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <ScholarshipCard data={item} page={currentPage} />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-20 text-2xl">
              No scholarships found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex mt-10 justify-center gap-3 mb-16">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-lg transition"
            >
              Prev
            </button>
          )}

          {[...Array(totalPage).keys()].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-5 py-2 rounded-full transition duration-300 shadow-md ${
                currentPage === index + 1
                  ? "text-white bg-gradient-to-r from-cyan-500 to-blue-600"
                  : "text-gray-700 hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-600"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {currentPage < totalPage && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-lg transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Allscholarship;
