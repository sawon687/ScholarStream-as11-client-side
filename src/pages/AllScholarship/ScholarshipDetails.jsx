import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const ScholarshipDetails = () => {
    
    const { id } = useParams();
    console.log('maer id',id)
      const axiosSecure=useAxiosSecure()
    // Find selected scholarship
    const {data=[]}=useQuery({
        queryKey:['scholarship',id],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/scholarships/${id}`)

            return res.data
        }
    })

    if(!data){
        return <p className="text-center mt-20">Scholarship Not Found</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6">

                {/* Image */}
                <img 
                  src={data.universityImage} 
                  className="w-full h-60 object-cover rounded-xl"
                />

                {/* Title */}
                <h1 className="text-3xl font-bold mt-5 text-gray-800">
                  {data.scholarshipName}
                </h1>

                <p className="text-gray-600 mt-1">
                  {data.universityName}
                </p>

                {/* Location */}
                <p className="text-sm text-gray-500 mt-2">
                    📍 {data.universityCity}, {data.universityCountry}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

                    <div>
                        <h3 className="font-semibold">Scholarship Category</h3>
                        <p>{data.scholarshipCategory}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Subject Category</h3>
                        <p>{data.subjectCategory}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Degree</h3>
                        <p>{data.degree}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Application Fees</h3>
                        <p>{data.applicationFees || "N/A"}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Service Charge</h3>
                        <p>{data.serviceCharge || "N/A"}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Deadline</h3>
                        <p>{data.applicationDeadline}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold">Publish Date</h3>
                        <p>{data.scholarshipPostDate}</p>
                    </div>

                </div>

                {/* Back button */}
                <button 
                  onClick={() => window.history.back()}
                  className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-xl
                             hover:bg-blue-700"
                >
                    Back
                </button>

            </div>
        </div>
    );
};

export default ScholarshipDetails;
