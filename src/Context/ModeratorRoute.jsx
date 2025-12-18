import React from 'react';
import useRole from '../Hook/useRole';
import ForbiddenError from '../pages/ForbiddenError';

const ModeratorRoute = () => {
    const {role,isLoading}=useRole()
    if(isLoading)
    {
         return <h1 className='text-center text-5xl'>Loading this ...</h1>;
    }
    
    if(role !== 'moderator')
    {
         return <ForbiddenError></ForbiddenError>
    }
};

export default ModeratorRoute;