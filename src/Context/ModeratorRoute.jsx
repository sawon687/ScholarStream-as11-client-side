import React from 'react';
import useRole from '../Hook/useRole';
import ForbiddenError from '../pages/ForbiddenError';

const ModeratorRoute = ({children}) => {
    const {role,isLoading}=useRole()
    if(isLoading)
    {
         return <h1 className='text-center text-5xl'>Loading this ...</h1>;
    }
    
    if(role !== 'moderator')
    {
         return <ForbiddenError></ForbiddenError>
    }

    return children
};

export default ModeratorRoute;