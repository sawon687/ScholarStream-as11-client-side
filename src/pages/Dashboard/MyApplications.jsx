import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UseAuth from "../../Hook/UseAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Loading from "../Loading";

const MyApplications = () => {
    const [openDetails, setOpenDetails] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [selected, setSelected] = useState(null);
    const { user, loading } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const { data: applications = [], refetch, isLoading } = useQuery({
        queryKey: ["application", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/application?email=${user?.email}`);
            return res.data;
        },
    });

    // Conditional rendering
    const canPending = (app) => app.applicationStatus === "pending";
    const canPay = (app) =>
        app.applicationStatus === "pending" && app.paymentStatus === "unpaid";
    const canReview = (app) => app.applicationStatus === "Completed";

    const handleDeleteappli = async (id) => {
        const res = await axiosSecure.delete(`/application/${id}`);
        if (res.data.deletedCount) {
            refetch();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Scholarship deleted successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const handlePayment = async (applicationId) => {
        const res = await axiosSecure.post("/create-checkout-session", { applicationId });
        if (res.data.url) {
            window.location.href = res.data.url;
        }
    };

    const handleReviews = async (data) => {
        const userReview = {
            scholarshipName: selected.scholarshipName,
            universityName: selected.universityName,
            reviewComment: data.userComment,
            rating: data.rating,
            userImage: user.photoURL,
            userName: user.displayName,
            scholarshipId: selected.scholarshipId,
            userEmail: user.email,
        };
        const res = await axiosSecure.post("/reviews", userReview);
        if (res.data.insertedId) {
            setOpenReview(false);
            reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Review submitted successfully",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    if (loading || isLoading) {
        return <Loading />;
    }

    return (
        <div className="bg-white/10 backdrop-blur-3xl rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-md">
                My Applications
            </h2>

            <div className="overflow-x-auto rounded-xl shadow-inner">
                <table className="table w-full text-white">
                    {/* Table Head */}
                    <thead className="bg-white/20 backdrop-blur-xl text-white">
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

                    {/* Table Body */}
                    <tbody>
                        {applications.map((app, index) => (
                            <tr key={app._id} className="hover:bg-white/10 transition-all">
                                <td className="font-medium">{index + 1}</td>
                                <td className="font-medium">{app.universityName}</td>
                                <td>{app.universityCity}</td>
                                <td className="text-sm">{app.feedback || "—"}</td>
                                <td>{app.subjectCategory}</td>
                                <td>${app.applicationFees}</td>
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
                                <td className="flex flex-wrap gap-2 justify-center">
                                    <button
                                        className="btn btn-sm btn-outline text-white"
                                        onClick={() => {
                                            setSelected(app);
                                            setOpenDetails(true);
                                        }}
                                    >
                                        Details
                                    </button>
                                    {canPending(app) && (
                                        <button className="btn btn-sm btn-ghost text-white">
                                            Edit
                                        </button>
                                    )}
                                    {canPay(app) && (
                                        <button
                                            className="btn btn-sm btn-info text-white"
                                            onClick={() => handlePayment(app._id)}
                                        >
                                            Pay
                                        </button>
                                    )}
                                    {canPending(app) && (
                                        <button
                                            className="btn btn-sm btn-error text-white"
                                            onClick={() => handleDeleteappli(app._id)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                    {canReview(app) && (
                                        <button
                                            className="btn btn-sm btn-success btn-outline"
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

            {/* Review Modal */}
            {openReview && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
                    <div className="relative max-w-md w-full mx-4 rounded-2xl bg-white/20 backdrop-blur-3xl p-6 shadow-xl">
                        <h3 className="font-bold text-lg mb-4 text-white">Add Review</h3>
                        <form onSubmit={handleSubmit(handleReviews)}>
                            <div className="space-y-4">
                                <input
                                    {...register("rating")}
                                    type="number"
                                    min="1"
                                    max="5"
                                    placeholder="Rating (1-5)"
                                    className="input input-bordered w-full bg-white/10 text-white placeholder-white/70"
                                />
                                <textarea
                                    {...register("userComment")}
                                    placeholder="Comment"
                                    className="textarea textarea-bordered w-full bg-white/10 text-white placeholder-white/70"
                                />
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => {
                                        setOpenReview(false);
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

export default MyApplications;
