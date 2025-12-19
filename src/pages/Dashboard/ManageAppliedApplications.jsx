import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageApplications = () => {
    const axiosSecure = useAxiosSecure();
    const [selected, setSelected] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
 
   
          const {
            register,
            handleSubmit,
            reset
           
          } = useForm();
    // Fetch all applications
    const { data: applications = [], refetch } = useQuery({
        queryKey: ["applications"],
        queryFn: async () => {
            const res = await axiosSecure.get("/application");
            return res.data;
        },
    });

console.log('application=',applications)
    // Update application status
    const handleStatusUpdate = async (id, status) => {
        const res = await axiosSecure.patch(`/application/${id}`,{applicationStatus:status, });
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Application has been ${status} `,
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

  

    // Submit feedback
    const handleFeedbackSubmit = async (data) => {
        console.log('data',data)
         const feedbackText=data.feedbactText
        const res = await axiosSecure.patch(`/application/${selected._id}`, { feedback: feedbackText });
        if (res.data.modifiedCount) {
             setOpenFeedback(false);
            reset()
            refetch();
            Swal.fire("Success", "Feedback submitted", "success");
           
        }
    };



    return (
        <div className="p-6 bg-base-100 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Manage Applied Applications</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
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
                            <tr key={app._id}>
                                <td>{index + 1}</td>
                                <td>{app.userName}</td>
                                <td>{app.userEmail}</td>
                                <td>{app.universityName}</td>
                                <td>{app.feedback || "—"}</td>
                                <td>{app.applicationStatus}</td>
                                <td>{app.paymentStatus}</td>
                                <td className="flex flex-wrap justify-center gap-2">
                                    {/* Details Button */}
                                    <button
                                        className="btn btn-sm btn-outline"
                                        onClick={() => {
                                            setSelected(app);
                                            setOpenDetails(true);
                                        }}
                                    >
                                        Details
                                    </button>

                                    {/* Feedback Button */}
                                    {app.applicationStatus !== "completed" && (
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
                                                <button onClick={() => handleStatusUpdate(app._id,"Processing")}>
                                                    Processing
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => handleStatusUpdate(app._id,"Completed")}>
                                                    Completed
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Cancel Button */}
                                    <button
                                        className="btn btn-sm btn-error text-white"
                                        onClick={() => handleStatusUpdate(app._id,'rejected')}
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
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-3xl rounded-2xl">
                        <h3 className="font-bold text-lg mb-2">Application Details</h3>
                        <pre className="bg-base-200 p-4 rounded text-sm overflow-auto">
                            {JSON.stringify(selected, null, 2)}
                        </pre>
                        <div className="modal-action">
                            <button className="btn btn-outline" onClick={() => setOpenDetails(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* Feedback Modal */}
            {openFeedback && selected && (
                <dialog className="modal modal-open">
                    <div className="modal-box rounded-2xl">
                        <h3 className="font-bold text-lg mb-2">Add Feedback</h3>
                           <form onSubmit={handleSubmit(handleFeedbackSubmit)} >
                              <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Write feedback..."
                           
                             {...register('feedbactText')}
                           
                        ></textarea>
                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary" >
                                Submit
                            </button>
                            <button className="btn btn-outline" onClick={() => setOpenFeedback(false)}>
                                Cancel
                            </button>
                        </div>
                           </form>
                    </div>
                </dialog>
            )}

            
        </div>
    );
};

export default ManageApplications;
