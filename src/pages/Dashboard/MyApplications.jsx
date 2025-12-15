import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAuth from "../../Hook/UseAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const MyApplications = () => {
  const [openDetails, setOpenDetails] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [selected, setSelected] = useState(null);
     const {user}=UseAuth()
     const axiosSecure=useAxiosSecure()
   const {data: applications=[]}=useQuery({
       queryKey:['appliaction',user?.email],
       queryFn:async()=>{
          const res=await axiosSecure.get(`/application?userEmail=${user?.email}`)
          return res.data
       }
   })
console.log('data',applications)
  // Conditional rendering
  const canPending = (app) => app.applicationStatus === "pending";
  const canPay = (app) =>
    app.applicationStatus === "pending" && app.paymentStatus === "unpaid";
  const canReview = (app) => app.applicationStatus === "completed";

  return (
    <div className="bg-base-100 rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold mb-4">My Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
                <th>#</th>
              <th>University</th>
              <th>Address</th>
              <th>Feedback</th>
              <th>Category</th>
              <th>Fees</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            { 
            applications.map((app,index) => (
              <tr key={app._id}>
                 <td className="font-medium">{index+1}</td>
                <td className="font-medium">{app.universityName}</td>
                <td>{app.universityAddress}</td>
                <td className="text-sm">{app.feedback || "—"}</td>
                <td>{app.subjectCategory}</td>
                <td>${app.applicationFees}</td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      app.applicationStatus === "pending"
                        ? "badge-warning"
                        : app.applicationStatus === "completed"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {app.applicationStatus}
                  </span>
                </td>

                <td className="flex flex-wrap gap-2 justify-center">
                  {/* Details button */}
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => {
                      setSelected(app);
                      setOpenDetails(true);
                    }}
                  >
                    Details
                  </button>

                  {/* Edit button */}
                  {canPending(app) && (
                    <button className="btn btn-sm btn-ghost">Edit</button>
                  )}

                  {/* Pay button */}
                  {canPay(app) && (
                    <button className="btn btn-sm btn-info text-white">
                      Pay
                    </button>
                  )}

                  {/* Delete button */}
                  {canPending(app) && (
                    <button className="btn btn-sm btn-error text-white">
                      Delete
                    </button>
                  )}

                  {/* Add Review button */}
                  {canReview(app) && (
                    <button
                      className="btn btn-sm btn-outline btn-success"
                      onClick={() => {
                        setSelected(app);
                        setOpenReview(true);
                      }}
                    >
                      Add Review
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {openDetails && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-3xl rounded-2xl">
            <h3 className="font-bold text-lg mb-2">Application Details</h3>

            <pre className="bg-base-200 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(selected,null,2)}
            </pre>

            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setOpenDetails(false)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Review Modal */}
      {openReview && (
        <dialog className="modal modal-open">
          <div className="modal-box rounded-2xl">
            <h3 className="font-bold text-lg">Add Review</h3>

            <div className="space-y-4 mt-4">
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                className="input input-bordered w-full"
              />
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Comment"
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-primary">Submit</button>
              <button
                className="btn btn-outline"
                onClick={() => setOpenReview(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyApplications;
