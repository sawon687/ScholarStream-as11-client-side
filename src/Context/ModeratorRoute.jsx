import React from 'react';
import useRole from '../Hook/useRole';
import ForbiddenError from '../pages/ForbiddenError';
import Loading from '../pages/Loading';

const ModeratorRoute = ({children}) => {
    const {role,isLoading}=useRole()
    if(isLoading)
    {
         return <Loading></Loading>
    }
    
    if(role !== 'moderator')
    {
         return <ForbiddenError></ForbiddenError>
    }

    return children
};

export default ModeratorRoute;