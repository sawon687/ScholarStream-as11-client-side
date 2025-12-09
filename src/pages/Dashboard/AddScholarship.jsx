import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import PhotoimgeLink from "../../components/ImageConvart/PhotoimgeLink";

const AddScholarship = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlescholarshipSubmit = async (data) => {
    console.log("data:", data);

    const photourl = await PhotoimgeLink(data.photourl[0]);
    console.log(photourl);
    
  };

  return (
    <div
      className="min-h-screen w-full p-10 flex justify-center items-start 
      bg-[radial-gradient(circle_at_top_right,_rgba(50,0,80,0.6),_rgba(0,0,0,1))]"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 
        shadow-2xl rounded-2xl p-10"
      >
        <h2 className="text-3xl font-bold mb-10 text-white text-center">
          Admin – Add New Scholarship
        </h2>

        <form onSubmit={handleSubmit(handlescholarshipSubmit)}>
          {/* ADMIN PANEL GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

            {/* Scholarship Name */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium">Scholarship Name</label>
              <input
                type="text"
                placeholder="Enter scholarship name"
                {...register("scholarshipName", { required: true })}
                className="input input-bordered bg-white/20 text-white border-white/40 placeholder-white/60"
              />
              {errors.scholarshipName && (
                <p className="text-red-400 text-sm">Scholarship Name required</p>
              )}
            </div>

            {/* University Name */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium">University Name</label>
              <input
                type="text"
                placeholder="Enter university name"
                {...register("UniversityName", { required: true })}
                className="input input-bordered bg-white/20 text-white border-white/40 placeholder-white/60"
              />
              {errors.UniversityName && (
                <p className="text-red-400 text-sm">University Name required</p>
              )}
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium">Country</label>
              <input
                type="text"
                placeholder="Enter country"
                {...register("countryName", { required: true })}
                className="input input-bordered bg-white/20 text-white border-white/40 placeholder-white/60"
              />
              {errors.countryName && (
                <p className="text-red-400 text-sm">Country is required</p>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium">City</label>
              <input
                type="text"
                placeholder="Enter city"
                {...register("City", { required: true })}
                className="input input-bordered bg-white/20 text-white border-white/40 placeholder-white/60"
              />
              {errors.City && (
                <p className="text-red-400 text-sm">City is required</p>
              )}
            </div>

            {/* World Rank */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium">World Rank</label>
              <input
                type="number"
                placeholder="Enter world rank"
                {...register("WorldRank", { required: true })}
                className="input input-bordered bg-white/20 text-white border-white/40 placeholder-white/60"
              />
              {errors.WorldRank && (
                <p className="text-red-400 text-sm">World Rank required</p>
              )}
            </div>

            {/* Subject Category */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium">Subject Category</label>
              <select
                {...register("SubjectCategory", { required: true })}
                className="select select-bordered bg-white/20 text-white border-white/40"
              >
                <option className="bg-white text-black">Select category</option>
                <option className="bg-white text-black">Engineering</option>
                <option className="bg-white text-black">Medical</option>
                <option className="bg-white text-black">Business</option>
                <option className="bg-white text-black">Arts & Humanities</option>
              </select>
              {errors.SubjectCategory && (
                <p className="text-red-400 text-sm">Subject Category required</p>
              )}
            </div>

            {/* Scholarship Category */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium">Scholarship Category</label>
              <select
                {...register("ScholarshipCategory", { required: true })}
                className="select select-bordered bg-white/20 text-white border-white/40"
              >
                <option className="bg-white text-black">Select type</option>
                <option className="bg-white text-black">Full Funded</option>
                <option className="bg-white text-black">Partial Funded</option>
                <option className="bg-white text-black">Self Funded</option>
              </select>
              {errors.ScholarshipCategory && (
                <p className="text-red-400 text-sm">
                  Scholarship Category required
                </p>
              )}
            </div>

            {/* Degree */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium">Degree</label>
              <select
                {...register("Degree", { required: true })}
                className="select select-bordered bg-white/20 text-white border-white/40"
              >
                <option className="bg-white text-black">Select degree</option>
                <option className="bg-white text-black">Bachelor</option>
                <option className="bg-white text-black">Master</option>
                <option className="bg-white text-black">PhD</option>
              </select>
              {errors.Degree && (
                <p className="text-red-400 text-sm">Degree required</p>
              )}
            </div>

            {/* Tuition Fees */}
            <div className="flex flex-col gap-1">
              <label className="text-white font-medium">Tuition Fees</label>
              <input
                type="number"
                placeholder="Enter tuition fees"
                {...register("TuitionFees", { required: true })}
                className="input input-bordered bg-white/20 text-white border-white/40 placeholder-white/60"
              />
              {errors.TuitionFees && (
                <p className="text-red-400 text-sm">Tuition Fees required</p>
              )}
            </div>

            {/* Image Upload Full Width */}
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
                      if (file) {
                        setImagePreview(URL.createObjectURL(file));
                      }
                    },
                  })}
                />

                {!imagePreview ? (
                  <p className="text-white/80">
                    Drop image here or click to browse
                  </p>
                ) : (
                  <img
                    src={imagePreview}
                    className="w-40 mx-auto rounded-xl shadow-lg"
                  />
                )}
              </label>

              {errors.photourl && (
                <p className="text-red-400 text-sm">Image is required</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex justify-end">
            <button
              type="submit"
              className="px-10 py-3 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
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
