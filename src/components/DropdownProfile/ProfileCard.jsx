import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';
import { NavLink } from 'react-router';
import UseAuth from '../../Hook/UseAuth';
import { MdDashboardCustomize } from 'react-icons/md';

const ProfileCard = () => {
const {signOutUser}=UseAuth()

const handleSignout=()=>{
    signOutUser().then(res=>{
        console.log(res)
    })
}
    return (
        <div className='w-[230px] z-50 h-28 bg-base-200 shadow-2xl border-2 border-gray-300 rounded-2xl card absolute right-0'>
            <ul className='menu menu-horizontal h-full flex flex-col items-center  justify-center'>
                  <li  className='w-50'><NavLink to='/Dashboard' > <MdDashboardCustomize size={27} /><span className='text-xl font-bold text-gray-500'>Dashboard</span></NavLink></li>
                <li onClick={handleSignout} className='w-50'><NavLink > <IoLogOutOutline className='text-red-500 ' size={27} /><span className='text-xl font-bold  text-gray-500'>Log out</span></NavLink></li>
              
              
              
            </ul>
        </div>
    );
};

export default ProfileCard;