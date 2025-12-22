import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import UseAuth from '../../Hook/UseAuth';

const Paymentsuccess = () => {

    const axiosSecure = useAxiosSecure()
    const {loading}=UseAuth()
    const [searchparams] = useSearchParams()
    const sessionId = searchparams.get('session_id')
    const [paydata,setPayData]=useState({})
    useEffect(() => {

        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`).then(res => {
                console.log('data is',res.data)
                setPayData(res.data.scholarshipDetails)
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "payment is  successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        }

    }, [sessionId])

    if(loading)
    {
        return <h1 className='text-5xl text-center'>Loading...</h1> 
    }

    console.log('patdata',paydata)
    return (
        <>
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-emerald-950 p-6">
<motion.div
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.5 }}
className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-white"
>
{/* Icon */}
<div className="flex justify-center mb-4">
<CheckCircle className="w-20 h-20 text-green-400" />
</div>


{/* Title */}
<h1 className="text-3xl font-bold text-center text-green-400 mb-2">
Payment Successful 🎉
</h1>
<p className="text-center text-gray-300 mb-6">
Your scholarship application has been submitted successfully.
</p>


{/* Details Card */}
<div className="bg-black/30 rounded-xl p-6 space-y-3">
<div className="flex justify-between">
<span className="text-gray-400">Scholarship</span>
<span className="font-semibold">{paydata?.scholarshipName}</span>
</div>
<div className="flex justify-between">
<span className="text-gray-400">University</span>
<span className="font-semibold">{paydata?.universityName}</span>
</div>
<div className="flex justify-between">
<span className="text-gray-400">Degree</span>
<span className="font-semibold">{paydata?.degree}</span>
</div>
<div className="flex justify-between">
<span className="text-gray-400">Subject</span>
<span className="font-semibold">{paydata?.subject}</span>
</div>
<hr className="border-white/10 my-2" />
<div className="flex justify-between text-lg">
<span className="text-gray-300">Amount Paid</span>
<span className="font-bold text-green-400">${paydata?.amount}</span>
</div>
</div>


{/* Action Button */}
<div className="mt-8 text-center">
<Link to="/dashboard/my-applications">
<button className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-black font-semibold transition-all shadow-lg">
Go to My Applications
</button>
</Link>
</div>
</motion.div>
</div>  
        </>
    );
};

export default Paymentsuccess;