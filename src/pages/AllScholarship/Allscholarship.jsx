import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import ScholarshipCard from "../../components/ScholarshipCard";



const Allscholarship = () => {
    const axiosSecure=useAxiosSecure()
    const {data=[]}=useQuery({
         queryKey:['scholarships'],
         queryFn:async()=>{
            const res=await axiosSecure.get('/scholarships')
            
            return res.data
         }
    })

    return (
        <div className="min-h-screen mx-auto w-full  bg-gray-100">

            {/* Header Section */}
            <div className="py-10 text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    All Scholarships
                </h1>
                <p className="text-gray-600 mt-2">
                    Discover top global scholarships for students
                </p>
            </div>

            {/* Cards Container */}
            <div className="max-w-[1400px] mx-auto  px-8 pb-10">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                                lg:grid-cols-4 gap-10 ">

                    {data.map((data) => (
                        <ScholarshipCard key={data._id} data={data} />
                    ))}

                </div>
            </div>
        </div>
    );
};

export default Allscholarship;
