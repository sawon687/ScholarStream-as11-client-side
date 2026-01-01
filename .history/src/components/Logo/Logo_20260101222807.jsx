import React from 'react';
import logo from '../../assets/logo (3).png'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <div className='flex items-center'>
          <img className='w-15 mdh-15' src={logo} alt="" />
          <Link to='/' className='text-primary text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent  bg-clip-text'>ScholarStream</Link>
        </div>
    );
};

export default Logo;