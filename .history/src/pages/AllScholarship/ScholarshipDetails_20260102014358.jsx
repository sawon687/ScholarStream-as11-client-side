import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import UseAuth from "../../Hook/UseAuth";
import ScholarshipReviews from "./ScholarshipReviews";
import Loading from "../Loading";
import Swal from "sweetalert2";

const ScholarshipDetails = () => {
  const { user, loading } = UseAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  const { data: reviewdata = [], isLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?id=${id}`);
      return res.data;
    },
  });

  if (!data) {
    return (
      <p className="text-center mt-20 text-xl font-semibold text-white">
        Scholarship Not Found
      </p>
    );
  }

  if (loading || isLoading) {
    return <Loading />;
  }

  const handlePayment = async () => {
    if(!user)
    {
        Swal.fire({
                   position: "center",
                   icon: "success",
                   title: "place",
                   showConfirmButton: false,
                   timer: 1500,
                 });
    }
    const applicationInfo = {
      scholarshipId: data._id,
      universityCity: data.universityCity,
      userName: user.displayName,
      userEmail: user.email,
      universityName: data.universityName,
      scholarshipCategory: data.scholarshipCategory,
      subjectCategory: data.subjectCategory,
      serviceCharge: data.serviceCharge,
      applicationFees: data.applicationFees,
      degree: data.degree,
      scholarshipName: data.scholarshipName,
    };

    const resappli = await axiosSecure.post("/applications", applicationInfo);
    const applicationId = resappli.data.applicationId;

    if (applicationId) {
      const res = await axiosSecure.post("/create-checkout-session", {
        applicationId,
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-indigo-900 via-purple-900 to-black py-14 px-4">

      {/* ---- Main scholarship card ---- */}
      <div className="max-w-5xl mt-15
       mx-auto backdrop-blur-md bg-white/10 border border-white/10 rounded-3xl shadow-2xl p-8 text-white">

        {/* --------- Image --------- */}
        <img
          src={data.universityImage}
          className="w-full h-72 object-cover rounded-2xl shadow-lg"
        />

        {/* --------- Title --------- */}
        <h1 className="text-4xl font-extrabold mt-5 tracking-tight drop-shadow-md">
          {data.scholarshipName}
        </h1>

        <p className="text-lg opacity-90 mt-2">
          {data.universityName}
        </p>

        <p className="text-sm bg-purple-600/20 w-fit px-3 py-1 rounded-lg mt-4">
          📍 {data.universityCity}, {data.universityCountry}
        </p>

        {/* --------- Scholarship Info Grid --------- */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">

          <InfoCard
            title="Scholarship Category"
            data={data.scholarshipCategory}
          />
          <InfoCard title="Subject Category" data={data.subjectCategory} />
          <InfoCard title="Degree Level" data={data.degree} />
          <InfoCard
            title="Application Fees"
            data={data.applicationFees || "N/A"}
          />
          <InfoCard
            title="Service Charge"
            data={data.serviceCharge || "N/A"}
          />
          <InfoCard title="Deadline" data={data.applicationDeadline} />
          <InfoCard title="Published On" data={data.scholarshipPostDate} />

        </div>

        {/* --------- Apply Button --------- */}
        <button
          onClick={handlePayment}
          className="mt-10 w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform duration-300"
        >
          Apply for Scholarship
        </button>
      </div>

      {/* ---- Review Section ---- */}
      <section className="max-w-5xl mx-auto mt-14 text-white">
        <h2 className="text-3xl font-bold mb-6">Student Reviews</h2>

        {reviewdata.length > 0 ? (
          <div className="space-y-5">
            {reviewdata.map((review) => (
              <ScholarshipReviews key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No reviews yet.</p>
        )}
      </section>

    </div>
  );
};

const InfoCard = ({ title, data }) => (
  <div className="bg-white/10 p-4 rounded-xl border border-white/10 shadow-lg hover:bg-white/20 transition duration-300">
    <h4 className="font-semibold opacity-90">{title}</h4>
    <p className="text-white mt-1">{data}</p>
  </div>
);

export default ScholarshipDetails;
