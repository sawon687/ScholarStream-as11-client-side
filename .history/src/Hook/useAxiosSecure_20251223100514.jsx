import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";


// axios instance ekbar create
const axiosSecure = axios.create({
  baseURL: "https://scholar-stream-as11-server-side.vercel.app/",
});

const useAxiosSecure = () => {
  const { user,signOutUser ,loading  } = UseAuth();
const navigate=useNavigate()
  useEffect(() => {
 if(loading) return 
    
  const reqInterceptor=  axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
       
      return config;
    });
   const resInterceptor=  axiosSecure.interceptors.response.use( (response)=>{
                     return response;
              },(error)=>{
                    if (error.status === 401 || error.status== 403 ) {
                        signOutUser().then(
                          ()=>{
                            navigate('/Login')
                        })
                    }
                    return  Promise.reject(error)
              });
    return()=>{
            axiosSecure.interceptors.response.eject(resInterceptor);
           axiosSecure.interceptors.request.eject(reqInterceptor);
    }
  }, [user, navigate, signOutUser, loading]);

  return axiosSecure;
};

export default useAxiosSecure;
