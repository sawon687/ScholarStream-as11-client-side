import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import PhotoimgeLink from "../../../components/ImageConvart/PhotoimgeLink";
import Swal from "sweetalert2";

const UpdateScholarship = ({ modalRef, updatedata, refetch }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset(updatedata);
    setImagePreview(updatedata?.universityImage || null);
  }, [updatedata, reset]);

  const handleScholarshipSubmit = async (data) => {
    try {
      let imageUrl = updatedata?.universityImage;
      if (data.photourl && data.photourl.length > 0) {
        imageUrl = await PhotoimgeLink(data.photourl[0]);
      }

      delete data.photourl;
      delete data._id;

      const updateInfo = { ...data, universityImage: imageUrl };
      const res = await axiosSecure.patch(`/scholarships/${updatedata._id}`, updateInfo);

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Scholarship updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setImagePreview(imageUrl);
        reset({ ...updateInfo });
      }

      modalRef.current.close();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6 bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl shadow-2xl">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          Update Scholarship
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6"
        >
          <form onSubmit={handleSubmit(handleScholarshipSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Scholarship Name */}
              <div>
                <label className="text-white text-sm font-medium">Scholarship Name</label>
                <input
                  {...register("scholarshipName", { required: true })}
                  defaultValue={updatedata?.scholarshipName || ""}
                  className="input input-bordered w-full bg-white/10 text-white text-sm"
                />
              </div>

              {/* University Name */}
              <div>
                <label className="text-white text-sm font-medium">University Name</label>
                <input
                  {...register("universityName", { required: true })}
                  defaultValue={updatedata?.universityName || ""}
                  className="input input-bordered w-full bg-white/10 text-white text-sm"
                />
              </div>

              {/* Country */}
              <div>
                <label className="text-white text-sm font-medium">Country</label>
                <input
                  {...register("universityCountry", { required: true })}
                  defaultValue={updatedata?.universityCountry || ""}
                  className="input input-bordered w-full bg-white/10 text-white text-sm"
                />
              </div>

              {/* City */}
              <div>
                <label className="text-white text-sm font-medium">City</label>
                <input
                  {...register("universityCity", { required: true })}
                  defaultValue={updatedata?.universityCity || ""}
                  className="input input-bordered w-full bg-white/10 text-white text-sm"
                />
              </div>

              {/* World Rank */}
              <div>
                <label className="text-white text-sm font-medium">World Rank</label>
                <input
                  type="number"
                  {...register("universityWorldRank", { required: true })}
                  defaultValue={updatedata?.universityWorldRank || ""}
                  className="input input-bordered w-full bg-white/10 text-white text-sm"
                />
              </div>

              {/* Degree */}
              <div>
                <label className="text-white text-sm font-medium">Degree</label>
                <select
                  {...register("degree", { required: true })}
                  defaultValue={updatedata?.degree || "Bachelor"}
                  className="select select-bordered w-full bg-purple-900 backdrop-blur-2xl text-white text-sm"
                >
                  <option className="text-white" value="Bachelor">Bachelor</option>
                  <option className="text-white" value="Master">Master</option>
                  <option className="text-white" value="PhD">PhD</option>
                  <option className="text-white" value="Diploma">Diploma</option>
                </select>
              </div>

              {/* Application Deadline */}
              <div>
                <label className="text-white text-sm font-medium">Application Deadline</label>
                <input
                  type="date"
                  {...register("applicationDeadline", { required: true })}
                  defaultValue={updatedata?.applicationDeadline || ""}
                  className="input input-bordered w-full bg-white/10 text-white text-sm"
                />
              </div>

              {/* Service Charge */}
              <div>
                <label className="text-white text-sm font-medium">Service Charge</label>
                <input
                  type="number"
                  {...register("serviceCharge", { required: true })}
                  defaultValue={updatedata?.serviceCharge || ""}
                  className="input input-bordered w-full bg-white/10 text-white text-sm"
                />
              </div>

              {/* Subject Category */}
              <div>
                <label className="text-white text-sm font-medium">Subject Category</label>
                <select
                  {...register("subjectCategory", { required: true })}
                  defaultValue={updatedata?.subjectCategory || ""}
                  className="select select-bordered w-full bg-purple-900 text-white text-sm"
                >
                  <option className="text-white" value="Engineering">Engineering</option>
                  <option className="text-white" value="Medical">Medical</option>
                  <option className="text-white" value="Business">Business</option>
                  <option className="text-white" value="Arts and Humanities">Arts and Humanities</option>
                  <option className="text-white" value="Science">Science</option>
                </select>
              </div>

              {/* University Image */}
              <div className="lg:col-span-3">
                <label className="text-white text-sm font-medium">University Image</label>
                <input
                  type="file"
                  {...register("photourl")}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setImagePreview(URL.createObjectURL(file));
                  }}
                  className="file-input w-full bg-white/10 text-white text-sm"
                />
                {(imagePreview || updatedata?.universityImage) && (
                  <img
                    src={imagePreview || updatedata?.universityImage}
                    className="w-40 h-24 mt-3 rounded-xl shadow-lg object-cover"
                  />
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => modalRef.current.close()}
                className="btn btn-outline btn-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
              >
                Update
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </dialog>
  );
};

export default UpdateScholarship;
