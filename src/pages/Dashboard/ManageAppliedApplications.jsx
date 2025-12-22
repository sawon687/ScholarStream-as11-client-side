import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hook/UseAuth";
import useRole from "../../Hook/useRole";
import Loading from "../Loading";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selected, setSelected] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const { loading } = UseAuth();
  const { isLoading } = useRole();

  const { register, handleSubmit, reset } = useForm();

  // Fetch all applications
  const { data: applications = [], refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application");
      return res.data;
    },
  });

  // Update application status
  const handleStatusUpdate = async (id, status) => {
    const res = await axiosSecure.patch(`/application/${id}`, { applicationStatus: status });
    if (res.data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Application has been ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };

  // Submit feedback
  const handleFeedbackSubmit = async (data) => {
    const feedbackText = data.feedbactText;
    const res = await axiosSecure.patch(`/application/${selected._id}`, { feedback: feedbackText });
    if (res.data.modifiedCount) {
      setOpenFeedback(false);
      reset();
      refetch();
      Swal.fire("Success", "Feedback submitted", "success");
    }
  };

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-white/10 backdrop-blur-3xl rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
        Manage Applied Applications
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-inner">
        <table className="table w-full text-white">
          <thead className="bg-white/20 backdrop-blur-xl text-white">
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id} className="hover:bg-white/10 transition-all">
                <td>{index + 1}</td>
                <td>{app.userName}</td>
                <td>{app.userEmail}</td>
                <td>{app.universityName}</td>
                <td className="text-sm">{app.feedback || "—"}</td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      app.applicationStatus === "pending"
                        ? "badge-warning"
                        : app.applicationStatus === "Completed"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {app.applicationStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      app.paymentStatus === "paid" ? "badge-success" : "badge-info"
                    }`}
                  >
                    {app.paymentStatus}
                  </span>
                </td>
                <td className="flex flex-wrap justify-center gap-2">
                  {/* Details Button */}
                  <button
                    className="btn btn-sm btn-outline text-white"
                    onClick={() => {
                      setSelected(app);
                      setOpenDetails(true);
                    }}
                  >
                    Details
                  </button>

                  {/* Feedback Button */}
                  {app.applicationStatus !== "Completed" && (
                    <button
                      className="btn btn-sm btn-info text-white"
                      onClick={() => {
                        setSelected(app);
                        setOpenFeedback(true);
                      }}
                    >
                      Feedback
                    </button>
                  )}

                  {/* Update Status Dropdown */}
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-sm btn-ghost">
                      Update Status
                    </button>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                    >
                      <li>
                        <button onClick={() => handleStatusUpdate(app._id, "Processing")}>
                          Processing
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleStatusUpdate(app._id, "Completed")}>
                          Completed
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Cancel Button */}
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleStatusUpdate(app._id, "Rejected")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {openDetails && selected && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative max-w-3xl w-full mx-4 overflow-auto rounded-2xl bg-white/20 backdrop-blur-3xl p-6 shadow-xl">
            <h3 className="font-bold text-lg mb-2 text-white">Application Details</h3>
            <pre className="bg-white/10 p-4 rounded text-sm text-white overflow-auto max-h-[60vh]">
              {JSON.stringify(selected, null, 2)}
            </pre>
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-outline text-white"
                onClick={() => setOpenDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
{openFeedback && selected && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    {/* Overlay */}
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

    {/* Modal Box */}
    <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white/20 backdrop-blur-3xl p-6 shadow-xl flex flex-col">
      <h3 className="font-bold text-lg mb-4 text-white text-center">Add Feedback</h3>

      <form onSubmit={handleSubmit(handleFeedbackSubmit)} className="flex flex-col gap-4">
        <textarea
          className="textarea textarea-bordered w-full min-h-[120px] resize-none bg-white/10 text-white placeholder-white/70"
          placeholder="Write feedback..."
          {...register("feedbactText")}
        ></textarea>

        <div className="flex justify-center gap-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-outline text-white"
            onClick={() => {
              setOpenFeedback(false);
              setSelected(null);
              reset();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default ManageApplications;
