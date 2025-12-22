import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../Hook/UseAuth';
import Loading from '../pages/Loading';

const PrivateRoute = ({children}) => {
    const location=useLocation()
    const {user,loading}=UseAuth()
 if(loading)
 {
     return <Loading></Loading>
 }

   if(!user)
   {
     return  <Navigate to='/Login' state={{from:location}} replace></Navigate>
   }

   return children
};

export default PrivateRoute;