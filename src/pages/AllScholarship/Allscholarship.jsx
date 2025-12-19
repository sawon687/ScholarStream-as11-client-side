import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import ScholarshipCard from "../../components/ScholarshipCard";
import UseAuth from "../../Hook/UseAuth";
import { useForm } from "react-hook-form";


const Allscholarship = () => {
  const { loading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  // const [categoryFilter, setCategoryFilter] = useState("");
  // const [subjectFilter, setSubjectFilter] = useState("");
  const [totalshoclarship, setTotalscholarship] = useState(0)
  const [scholarship, setscholarData] = useState([])
  const [currentPage,setCurrentPage]=useState(1)
  // const [currentPage, setCurrentPage] = useState(1)
  const [categoryFilter,setCategoryFilter]=useState()
  const [subjectFilter,setSubjectFilter]=useState()
  const [totalPage,setToalPage]=useState(0)
  const limit = 10;
  const { data = {}, isLoading } = useQuery({
    queryKey: ['scholarships', searchText,currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships?search=${searchText}&limit=${limit}&skip=${currentPage * 10 }&s=${subjectFilter||categoryFilter}`);
      return res.data;
    }
  });


 



  useEffect(() => {
    if (data)
    {   const count = totalshoclarship / limit
    const page = Math.ceil(count)
    console.log(page)
     setToalPage(page)

      setTotalscholarship(data.totalScholar || [])
      setscholarData(data.scholarData)
    }
  }, [data,totalshoclarship,limit])

  const {
    register,
    handleSubmit,

  } = useForm();
  if (loading || isLoading) {
    return <h1 className='text-center text-5xl mt-20'>Loading...</h1>;
  }

  const handlesearch = (data) => {
    setSearchText(data.searchtext)
  }

 

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
        <form onSubmit={handleSubmit(handlesearch)} className="w-full flex justify-center ">
          <input
            type="text"
            placeholder="Search by Scholarship, University, Degree..."

            {...register("searchtext")}
            className="w-full sm:w-1/2 px-4 py-3 rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </form>

      </div>

     <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-wrap gap-3 justify-center">
        {/* Category Filter */}
        <select
          className="input input-bordered"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Categories</option>
          <option value="Full Fund">Full Fund</option>
          <option value="Partial">Partial</option>
          <option value="Self Fund">Self Fund</option>
        </select>

        {/* Subject Filter */}
        <select
          className="input input-bordered"
          value={subjectFilter}
          onChange={(e) => {
            setSubjectFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Subjects</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
          <option value="Engineering">Engineering</option>
        </select>

      
      </div>
      {/* Cards Container */}
      <div className="max-w-[1400px] mx-auto px-6 pb-12">
        {scholarship?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {scholarship.map((scholarship) => (
              <ScholarshipCard key={scholarship._id} data={scholarship} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-16 text-xl">
            No scholarships found.
          </p>
        )}
      </div>

       <div className="flex justify-center gap-3">
          {
            currentPage > 0 && <button onClick={()=> setCurrentPage(currentPage -1 )} className="btn">prev</button>
          }
         {
         [...Array(totalPage).keys()].map((index)=><button onClick={()=>{
          setCurrentPage(index)}} key={index}  className={`btn mx-2 ${currentPage === index  && 'btn-primary'}`}>{index}</button>)
       }
        <button onClick={()=> setCurrentPage(currentPage + 1)} className="btn">Next</button>
       </div>
      
    </div>
  );
};

export default Allscholarship;
