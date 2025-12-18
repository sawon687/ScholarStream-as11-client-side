import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';

const useRole = () => {
    const axiosSecure=useAxiosSecure()
    const {user}=UseAuth()

         const {data: role='user',isLoading}=useQuery({
                    queryKey:['user-role',user?.email],
                    queryFn:async()=>{
                         const res=await axiosSecure.get(`/user/${user?.email}/role`)
                          console.log(res.data)
                         return res.data?.role
                    }
         })

    return {role,isLoading}
};

export default useRole;