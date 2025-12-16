import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";

const ManageApplications = () => {
    const axiosSecure = useAxiosSecure();
    const [selected, setSelected] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);
    const [openFeedback, setOpenFeedback] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [feedbackText, setFeedbackText] = useState("");
    const [reviewText, setReviewText] = useState("");

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
                title: "Status updated successfully",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    // Cancel application
    const handleCancel = async (id) => {
        const res = await axiosSecure.patch(`/application/${id}`, { applicationStatus: "rejected" });
        if (res.data.modifiedCount) {
            Swal.fire("Cancelled", "Application has been rejected", "success");
            refetch();
        }
    };

    // Submit feedback
    const handleFeedbackSubmit = async () => {
        if (!feedbackText) return;
        const res = await axiosSecure.patch(`/application/${selected._id}`, { feedback: feedbackText });
        if (res.data.modifiedCount) {
            Swal.fire("Success", "Feedback submitted", "success");
            setOpenFeedback(false);
            setFeedbackText("");
            refetch();
        }
    };

    // Submit review
    const handleReviewSubmit = async () => {
        if (!reviewText) return;
        const res = await axiosSecure.patch(`/application/${selected._id}`, { review: reviewText });
        if (res.data.modifiedCount) {
            Swal.fire("Success", "Review submitted", "success");
            setOpenReview(false);
            setReviewText("");
            refetch();
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

                                    {/* Add Review Button */}
                                    {app.applicationStatus === "Completed" && (
                                        <button
                                            className="btn btn-sm btn-success text-white"
                                            onClick={() => {
                                                setSelected(app);
                                                setOpenReview(true);
                                            }}
                                        >
                                            Add Review
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
                                        onClick={() => handleCancel(app._id)}
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
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Write feedback..."
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                        ></textarea>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={handleFeedbackSubmit}>
                                Submit
                            </button>
                            <button className="btn btn-outline" onClick={() => setOpenFeedback(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}

            {/* Review Modal */}
            {openReview && selected && (
                <dialog className="modal modal-open">
                    <div className="modal-box rounded-2xl">
                        <h3 className="font-bold text-lg mb-2">Add Review</h3>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Write review..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={handleReviewSubmit}>
                                Submit
                            </button>
                            <button className="btn btn-outline" onClick={() => setOpenReview(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageApplications;
