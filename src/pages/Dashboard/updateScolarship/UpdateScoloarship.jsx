import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import PhotoimgeLink from "../../../components/ImageConvart/PhotoimgeLink";
import Swal from "sweetalert2";

const UpdateScoloarship = ({ modalRef, updatedata }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset
  } = useForm();


  useEffect(() => {
    reset(updatedata);
    setImagePreview(null); // পুরনো preview reset
  }, [updatedata, reset]);

  const handleScholarshipSubmit = async (data) => {
    let imageUrl = updatedata?.universityImage;

    if (data.photourl?.length > 0) {
      imageUrl = await PhotoimgeLink(data.photourl[0]);
    }

    const updateInfo = {
      ...data,
      universityImage: imageUrl,
    };



    console.log("UPDATE DATA:", updateInfo);

    // 🔥 Future: Send updateInfo to API
    const res = await axiosSecure.patch(`/scholarships/${updatedata._id}`, updateInfo);

    console.log(res.data)
    if (res.data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "update scholarships data successfully",
        showConfirmButton: false,
        timer: 1500
      });
    }
    modalRef.current.close();
  };

  

  
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box max-w-6xl w-full h-[90vh] overflow-y-auto p-10 bg-[radial-gradient(circle_at_top_right,_rgba(50,0,80,0.6),_rgba(0,0,0,1))]">
        <h3 className="font-bold text-2xl text-white mb-8 text-center">
          Update Scholarship
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10"
        >
          <form onSubmit={handleSubmit(handleScholarshipSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">

              {/* Scholarship Name */}
              <div>
                <label className="text-white">Scholarship Name</label>
                <input
                  {...register("scholarshipName", { required: true })}
                  defaultValue={updatedata?.scholarshipName || ""}
                  className="input input-bordered w-full bg-white/10 text-white"
                />
              </div>

              {/* University Name */}
              <div>
                <label className="text-white">University Name</label>
                <input
                  {...register("universityName", { required: true })}
                  defaultValue={updatedata?.universityName || ""}
                  className="input input-bordered w-full bg-white/10 text-white"
                />
              </div>

              {/* Country */}
              <div>
                <label className="text-white">Country</label>
                <input
                  {...register("universityCountry", { required: true })}
                  defaultValue={updatedata?.universityCountry || ""}
                  className="input input-bordered w-full bg-white/10 text-white"
                />
              </div>

              {/* City */}
              <div>
                <label className="text-white">City</label>
                <input
                  {...register("universityCity", { required: true })}
                  defaultValue={updatedata?.universityCity || ""}
                  className="input input-bordered w-full bg-white/10 text-white"
                />
              </div>

              {/* World Rank */}
              <div>
                <label className="text-white">World Rank</label>
                <input
                  type="number"
                  {...register("universityWorldRank", { required: true })}
                  defaultValue={updatedata?.universityWorldRank || ""}
                  className="input input-bordered w-full bg-white/10 text-white"
                />
              </div>

              {/* Degree */}
              <div>
                <label className="text-white">Degree</label>
                <select
                  {...register("degree", { required: true })}
                  defaultValue={updatedata.degree || "Bachelor"} // ✅ শুধু select এ
                  className="select select-bordered w-full bg-white/10 text-white"
                >
                  <option className="text-black" value="Bachelor">Bachelor</option>
                  <option className="text-black" value="Master">Master</option>
                  <option className="text-black" value="PhD">PhD</option>
                </select>
              </div>


              {/* Application Deadline */}
              <div>
                <label className="text-white">Application Deadline</label>
                <input
                  type="date"
                  {...register("applicationDeadline", { required: true })}
                  defaultValue={updatedata?.applicationDeadline || ""}
                  className="input input-bordered w-full bg-white/10 text-white"
                />
              </div>

              {/* Service Charge */}
              <div>
                <label className="text-white">Service Charge</label>
                <input
                  type="number"
                  {...register("serviceCharge", { required: true })}
                  defaultValue={updatedata?.serviceCharge || ""}
                  className="input input-bordered w-full bg-white/10 text-white"
                />
              </div>
                     <div>
          <label className="text-white font-medium">Subject Category</label>
          <select
            {...register("subjectCategory", { required: true })} defaultValue={updatedata.subjectCategory}
            className="select select-bordered w-full bg-white/10 text-white"
          >
          
            <option className="text-black" value='Engineering'>Engineering</option>
            <option className="text-black" value='Medical'>Medical</option>
            <option className="text-black" value="Business">Business</option>
            <option className="text-black" value='Arts & Humanities'>Arts & Humanities</option>
          </select>
          

        </div>

              {/* University Image */}
              <div className="lg:col-span-3">
                <label className="text-white">University Image</label>
                <input
                  type="file"

                  {...register("photourl")}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setImagePreview(URL.createObjectURL(file));
                  }}
                  className="file-input w-full bg-white/10 text-white"
                />
                {(imagePreview || updatedata?.universityImage) && (
                  <img
                    src={imagePreview || updatedata.universityImage}
                    className="w-40 h-20 mt-4 rounded-xl shadow-lg"
                  />
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => modalRef.current.close()}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
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

export default UpdateScoloarship;
