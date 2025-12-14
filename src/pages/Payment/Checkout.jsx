import { useParams, useNavigate } from "react-router";


import UseAuth from "../../Hook/UseAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Checkout = () => {
  const { id } = useParams(); // scholarshipId
  const navigate = useNavigate();
  const { user } = UseAuth();
   const axiosSecure=useAxiosSecure()
  


  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ["checkout-scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });
const totalAmount=Number(scholarship.applicationFee)+Number(scholarship.serviceCharge)
  const handlePayment=async()=>{
   const applicationInfo={
            scholarshipId:scholarship.scholarshipId,
     scholarshipName: scholarship.scholarshipName,
     userEmail: user.userEmail,
     applicationFee: scholarship.applicationFee,    // optional
      serviceCharge: scholarship.serviceCharge,      // optional
     totalAmount:Number(totalAmount),
    }

    const res=await axiosSecure.post('/create-checkout-session',applicationInfo)
    
    console.log(res.data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Scholarship Application Checkout
        </h2>

        {/* User Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Applicant Information</h3>
          <p>Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
        </div>

        {/* Scholarship Info */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Scholarship Details</h3>
          <p>Scholarship: {scholarship.scholarshipName}</p>
          <p>University: {scholarship.universityName}</p>
          <p>Degree: {scholarship.degree}</p>
          <p>Country: {scholarship.universityCountry}</p>
        </div>

        {/* Payment Summary */}
        <div className="mb-6 border-t border-white/20 pt-4">
          <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
          <p>Application Fee: ${scholarship.applicationFees}</p>
          <p>Service Charge: ${scholarship.serviceCharge || 0}</p>
          {/* <p className="font-bold mt-2">Total: ${totalAmount}</p> */}
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handlePayment}
            className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 font-semibold"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
