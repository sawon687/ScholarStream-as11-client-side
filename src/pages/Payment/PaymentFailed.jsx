import { Link,  useSearchParams } from "react-router";
import { XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const PaymentFailed = () => {
    const [searchparams]=useSearchParams();
    const    sessionId=searchparams.get('session_id')
     const axiosSecure=useAxiosSecure()
  // Expected state from failed payment redirect
 
    const {data={}}=useQuery({
        queryKey:['payment-failed',sessionId],
         queryFn:async()=>{
            
            const res = await axiosSecure.get(`/payment-failed?session_id=${sessionId}`);

               return res.data
         }
    })

    console.log(data)
        
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-rose-950 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-white"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <XCircle className="w-20 h-20 text-red-400" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-red-400 mb-2">
          Payment Failed ❌
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Unfortunately, your payment was not successful.
        </p>

        {/* Details */}
        <div className="bg-black/30 rounded-xl p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">ScholarshipName</span>
            <span className="font-semibold">{data?.scholarshipName}</span>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-sm text-red-300">
              <span className="font-semibold">Error:</span> {data.errorMessage}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Link to="/dashboard">
            <button className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-black font-semibold transition-all shadow-lg">
              Return to Dashboard
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
