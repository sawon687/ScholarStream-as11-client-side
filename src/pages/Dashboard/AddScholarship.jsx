import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import PhotoimgeLink from "../../components/ImageConvart/PhotoimgeLink";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import UseAuth from "../../Hook/UseAuth";
import Loading from "../Loading";
import Swal from "sweetalert2";

const AddScholarship = () => {
  const { loading } = UseAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset ,formState: { errors } } = useForm();

  if (loading) return <Loading />;

  const handlescholarshipSubmit = async (data) => {
    try {
      const photourl = await PhotoimgeLink(data.photourl[0]);
      const scholarshipInfo = { ...data, universityImage: photourl };
      const res = await axiosSecure.post("/scholarships", scholarshipInfo);
      console.log("Data submitted:", res.data);
      if(res.data.insertedId)
      {
         Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Scholarship add successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset()
      }
    } catch (error) {
      console.error("Error submitting scholarship:", error);
    }
  };

  const inputClass = "w-full  text-white border border-white/30 rounded-xl px-5 py-4 placeholder-white/60 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition duration-300 text-lg";

  return (
    <div className=" w-full flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 flex flex-col justify-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">Add New Scholarship</h2>

        <form onSubmit={handleSubmit(handlescholarshipSubmit)} className="flex-1 flex flex-col justify-between overflow-hidden">
          {/* Grid: 3 columns on large screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="text-white font-semibold mb-1 block">Scholarship Name</label>
              <input type="text" placeholder="Enter scholarship name" {...register("scholarshipName", { required: true })} className={inputClass} />
              {errors.scholarshipName && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div>
              <label className="text-white font-semibold mb-1 block">University Name</label>
              <input type="text" placeholder="Enter university name" {...register("universityName", { required: true })} className={inputClass} />
              {errors.universityName && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div>
              <label className="text-white font-semibold mb-1 block">Country</label>
              <input type="text" placeholder="Enter country" {...register("universityCountry", { required: true })} className={inputClass} />
              {errors.universityCountry && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div>
              <label className="text-white font-semibold mb-1 block">City</label>
              <input type="text" placeholder="Enter city" {...register("universityCity", { required: true })} className={inputClass} />
              {errors.universityCity && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div>
              <label className="text-white font-semibold mb-1 block">World Rank</label>
              <input type="number" placeholder="Enter world rank" {...register("universityWorldRank", { required: true })} className={inputClass} />
              {errors.universityWorldRank && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div>
              <label className="text-white font-semibold mb-1 block">Subject Category</label>
              <select {...register("subjectCategory", { required: true })} className={inputClass}>
                <option className="text-black">Select category</option>
                <option className="text-black">Engineering</option>
                <option className="text-black">Medical</option>
                <option className="text-black">Business</option>
                <option className="text-black">Arts and Humanities</option>
              </select>
              {errors.subjectCategory && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div>
              <label className="text-white font-semibold mb-1 block">Scholarship Category</label>
              <select {...register("scholarshipCategory", { required: true })} className={inputClass}>
                <option className="text-black">Select type</option>
                <option className="text-black">Full Funded</option>
                <option className="text-black">Partial Funded</option>
                <option className="text-black">Self Funded</option>
              </select>
              {errors.scholarshipCategory && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div>
              <label className="text-white font-semibold mb-1 block">Degree</label>
              <select {...register("degree", { required: true })} className={inputClass}>
                <option className="text-black">Select degree</option>
                <option className="text-black">Diploma</option>
                <option className="text-black">Bachelor</option>
                <option className="text-black">Masters</option>
              </select>
              {errors.degree && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div className="md:col-span-3">
              <label className="text-white font-semibold mb-1 block">Your Email</label>
              <input type="email" placeholder="Enter your email" {...register("postedUserEmail", { required: true })} className={inputClass} />
              {errors.postedUserEmail && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div>
              <label className="text-white font-semibold mb-1 block">Application Deadline</label>
              <input type="date" {...register("applicationDeadline", { required: true })} className={inputClass} />
              {errors.applicationDeadline && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div>
              <label className="text-white font-semibold mb-1 block">Application Fees</label>
              <input type="number" placeholder="Enter application fees" {...register("applicationFees", { required: true })} className={inputClass} />
              {errors.applicationFees && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            <div>
              <label className="text-white font-semibold mb-1 block">Service Charge</label>
              <input type="number" placeholder="Enter service charge" {...register("serviceCharge", { required: true })} className={inputClass} />
              {errors.serviceCharge && <p className="text-red-400 text-sm mt-1">Required</p>}
            </div>

            {/* Image Upload */}
            <div className="md:col-span-3">
              <label className="text-white font-semibold mb-2 block">Upload Image</label>
              <div className="border-2 border-dashed border-white/40 rounded-xl p-6 text-center cursor-pointer bg-white/10 hover:bg-white/20 transition relative h-64 flex items-center justify-center">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  {...register("photourl", {
                    required: true,
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (file) setImagePreview(URL.createObjectURL(file));
                    }
                  })}
                />
                {imagePreview ? (
                  <img src={imagePreview} className="max-h-full mx-auto rounded-xl shadow-lg" />
                ) : (
                  <p className="text-white/80 text-lg">Drop image here or click to browse</p>
                )}
              </div>
              {errors.photourl && <p className="text-red-400 text-sm mt-1">Image is required</p>}
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 flex justify-center">
            <button type="submit" className="px-20 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600  hover:opacity-90 transition duration-300 text-lg">
              Add Scholarship
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddScholarship;
