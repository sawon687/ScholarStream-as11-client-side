import React from 'react';
import { Link } from 'react-router';

const ForbiddenError = () => {
    return (
        <div>
            <h1 className='text 5xl text center'>this is forbidden</h1>
            <Link to='/' className='btn btn-primary' >Go to Home</Link>
        </div>
    );
};

export default ForbiddenError;