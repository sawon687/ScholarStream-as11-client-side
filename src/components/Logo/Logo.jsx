import React from 'react';
import logo from '../../assets/logo (3).png'
const Logo = () => {
    return (
        <div className='flex items-center'>
          <img className='w-15 h-15' src={logo} alt="" />
          <h1 className='text-primary text-2xl font-bold'>ScholarStream</h1>
        </div>
    );
};

export default Logo;