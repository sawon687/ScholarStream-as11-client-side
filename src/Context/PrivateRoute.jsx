import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import UseAuth from '../Hook/UseAuth';

const PrivateRoute = ({children}) => {
    const location=useLocation()
    const {user}=UseAuth()


   if(!user)
   {
     return  <Navigate to='/Login' state={{from:location}} replace></Navigate>
   }

   return children
};

export default PrivateRoute;