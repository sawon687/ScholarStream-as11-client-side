import React from 'react';
import ForbiddenError from '../pages/ForbiddenError';
import useRole from '../Hook/useRole';

const AdminRoute = ({children}) => {
      const {role, isLoading}=useRole()
      if(isLoading)
      {
         return <h1 className='text-center text-5xl'>Loading this ...</h1>;
      }

      if(role !== 'admin')
      {
         return <ForbiddenError></ForbiddenError>
      }

    return children
     
};

export default AdminRoute;