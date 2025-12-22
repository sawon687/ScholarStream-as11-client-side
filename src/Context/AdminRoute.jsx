import React from 'react';
import ForbiddenError from '../pages/ForbiddenError';
import useRole from '../Hook/useRole';
import Loading from '../pages/Loading';

const AdminRoute = ({children}) => {
      const {role, isLoading}=useRole()
      if(isLoading)
      {
         return <Loading></Loading>
      }

      if(role !== 'admin')
      {
         return <ForbiddenError></ForbiddenError>
      }

    return children
     
};

export default AdminRoute;