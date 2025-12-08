import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../components/Logo/Logo';
import AuthBg from '../assets/authbg.jpg'
import Auth from '../assets/auth.jpg'

const AuthLayout = () => {
    return (
    
        <div className=" min-h-screen
  w-full  bg-[#CCE0FF]">
            
            <Logo></Logo>
            <div className='w-7xl flex mx-auto min-h-[500px]  rounded-2xl bg-gradient-to-br from-neutral-100 via-yellow-50 to-yellow-300'>
                 <div className=' flex-1 '>
                <Outlet></Outlet>
            </div>
            <div className='flex-1  w-full flex items-center px-10 justify-center  '>
                    <img src={Auth} className='h-[500px]  w-full rounded-2xl' alt="" />
            </div>
            </div>
        </div>
    );
};

export default AuthLayout;