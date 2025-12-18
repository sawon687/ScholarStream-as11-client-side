import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import UseAuth from '../Hook/UseAuth';

const PrivateRoute = ({children}) => {
    const location=useLocation()
    const {user,  loading}=UseAuth()
 if(loading)
 {
     return <h1 className='text-center text-5xl'>Loading this ...</h1>;
 }

   if(!user)
   {
     return  <Navigate to='/Login' state={{from:location}} replace></Navigate>
   }

   return children
};

export default PrivateRoute;