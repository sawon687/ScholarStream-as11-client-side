import React from "react";
import { Link } from "react-router";
import UseAuth from "../Hook/UseAuth";

const ScholarshipCard = ({ data }) => {
  const  {loading}=UseAuth()

 
     if(loading)
    {
        return <h1 className='text-center text-5xl'>Loading this ...</h1>;
    }
  
  return (
    <div
      className="w-80 bg-white rounded-2xl shadow-md overflow-hidden
                 hover:shadow-xl hover:-translate-y-1 transition
                 duration-300 border border-gray-100"
    >

      {/* University Image */}
      <div className="overflow-hidden">
        <img
          src={data.universityImage}
          className="h-40 w-full object-cover hover:scale-105 transition"
          alt="university"
        />
      </div>

      <div className="p-5">

        {/* Scholarship Name */}
        <h2 className="text-xl font-bold text-gray-800 leading-tight">
          {data.scholarshipName}
        </h2>

        {/* University Name */}
        <p className="text-sm text-gray-600 mt-1">
          {data.universityName}
        </p>

        {/* Location */}
        <p className="text-xs text-gray-500 mt-1">
          📍 {data.universityCity}, {data.universityCountry}
        </p>

        {/* Category & Degree */}
        <div className="mt-3 flex flex-wrap gap-2">

          <span className="px-2 py-1 bg-indigo-50 text-indigo-600 
                           border border-indigo-200 rounded text-xs font-medium">
            {data.scholarshipCategory}
          </span>

          <span className="px-2 py-1 bg-green-50 text-green-600
                           border border-green-200 rounded text-xs font-medium">
            {data.degree}
          </span>

        </div>

        {/* Application Fees (optional) */}
        {data.applicationFees && (
          <p className="text-sm mt-2 text-gray-700">
            💵 Application Fees: ${data.applicationFees}
          </p>
        )}

        {/* Details button */}
        <Link
          to={`/ScholarshipDetails/${data._id}`}
          className="inline-block mt-4 px-4 py-2 bg-primary
                     text-white rounded-xl text-sm font-medium
                     hover:bg-blue-700 transition"
        >
          View Details
        </Link>

      </div>
    </div>
  );
};

export default ScholarshipCard;
