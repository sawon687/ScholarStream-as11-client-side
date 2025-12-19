import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import PhotoimgeLink from "../../components/ImageConvart/PhotoimgeLink";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import UseAuth from "../../Hook/UseAuth";
import { h1 } from "framer-motion/client";

const AddScholarship = () => {
  const {loading}=UseAuth()
  const [imagePreview, setImagePreview] = useState(null);
  const axiosSecure = useAxiosSecure();
 
   if(loading)
   {
     return <h1 className="text-center text-5xl">Loading...</h1>
   }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlescholarshipSubmit = async (data) => {
    const photourl = await PhotoimgeLink(data.photourl[0]);

    const scholarshipInfo = {
      ...data,
      universityImage: photourl,
      
    };

    axiosSecure.post("/scholarships", scholarshipInfo).then((res) => {
      console.log("data:", res.data);
    });
  };

  return (
   <div className="min-h-screen w-full p-10 flex justify-center items-start bg-[radial-gradient(circle_at_top_right,_rgba(50,0,80,0.6),_rgba(0,0,0,1))]">
     
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10"
  >
    <h2 className="text-3xl font-bold mb-10 text-white text-center">
      Admin – Add New Scholarship
    </h2>

    <form onSubmit={handleSubmit(handlescholarshipSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

        {/* Scholarship Name */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">Scholarship Name</label>
          <input
            type="text"
            placeholder="Enter scholarship name"
            {...register("scholarshipName", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 placeholder-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          />
          {errors.scholarshipName && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* University Name */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">University Name</label>
          <input
            type="text"
            placeholder="Enter university name"
            {...register("universityName", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 placeholder-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          />
          {errors.universityName && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* Country */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">University Country</label>
          <input
            type="text"
            placeholder="Enter country"
            {...register("universityCountry", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 placeholder-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          />
          {errors.universityCountry && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">University City</label>
          <input
            type="text"
            placeholder="Enter city"
            {...register("universityCity", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 placeholder-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          />
          {errors.universityCity && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* World Rank */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">University World Rank</label>
          <input
            type="number"
            placeholder="Enter world rank"
            {...register("universityWorldRank", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 placeholder-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          />
          {errors.universityWorldRank && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* Subject Category */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">Subject Category</label>
          <select
            {...register("subjectCategory", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          >
            <option className="text-black">Select category</option>
            <option className="text-black">Engineering</option>
            <option className="text-black">Medical</option>
            <option className="text-black">Business</option>
            <option className="text-black">Arts & Humanities</option>
          </select>
          {errors.subjectCategory && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* Scholarship Category */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">Scholarship Category</label>
          <select
            {...register("scholarshipCategory", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          >
            <option className="text-black">Select type</option>
            <option className="text-black">Full Funded</option>
            <option className="text-black">Partial Funded</option>
            <option className="text-black">Self Funded</option>
          </select>
          {errors.scholarshipCategory && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* Degree */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">Degree</label>
          <select
            {...register("degree", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          >
            <option className="text-black">Select degree</option>
            <option className="text-black">Diploma</option>
            <option className="text-black">Bachelor</option>
            <option className="text-black">Masters</option>
          </select>
          {errors.degree && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-white font-medium">Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("postedUserEmail", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 placeholder-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          />
          {errors.postedUserEmail && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* Deadline */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">Application Deadline</label>
          <input
            type="date"
            {...register("applicationDeadline", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          />
          {errors.applicationDeadline && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* Application Fees */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">Application Fees</label>
          <input
            type="number"
            placeholder="Enter application fees"
            {...register("applicationFees", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 placeholder-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          />
          {errors.applicationFees && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* Service Charge */}
        <div className="flex flex-col gap-1">
          <label className="text-white font-medium">Service Charge</label>
          <input
            type="number"
            placeholder="Enter service charge"
            {...register("serviceCharge", { required: true })}
            className="w-full bg-white/10 text-white border border-white/30 rounded-xl px-4 py-3 placeholder-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300"
          />
          {errors.serviceCharge && (
            <p className="text-red-400 text-sm">Required</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-white font-medium">Upload Image</label>
          <label className="border-2 border-dashed border-white/40 rounded-xl p-6 text-center cursor-pointer bg-white/10 hover:bg-white/20 transition">
            <input
              type="file"
              className="hidden"
              {...register("photourl", {
                required: true,
                onChange: (e) => {
                  const file = e.target.files[0];
                  if (file) setImagePreview(URL.createObjectURL(file));
                },
              })}
            />

            {!imagePreview ? (
              <p className="text-white/80">Drop image here or click to browse</p>
            ) : (
              <img
                src={imagePreview}
                className="w-40 mx-auto rounded-xl shadow-lg"
              />
            )}
            {errors.photourl && (
              <p className="text-red-400 text-sm">Image is required</p>
            )}
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="mt-10 flex justify-end">
        <button
          type="submit"
          className="px-10 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
        >
          Add Scholarship
        </button>
      </div>
    </form>
  </motion.div>
</div>

  );
};

export default AddScholarship;
