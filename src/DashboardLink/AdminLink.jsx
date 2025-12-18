import React from 'react';
import useRole from '../Hook/useRole';
import { NavLink } from 'react-router';
import { FaGoogleScholar } from 'react-icons/fa6';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { TbDeviceAnalytics } from 'react-icons/tb';

const AdminLink = () => {
    const {role, isLoading}=useRole()
    return (
        <div>

 {/* admin dashboard  */}
{  role === 'admin'&& <>     <li><NavLink to='add-scholarship' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Scholarship"><IoMdAddCircleOutline  className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>Add Scholarship</h1></NavLink></li>
     {/* manage scholrship */}
     <li><NavLink to='ManageScholarships' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Scholarships"><FaGoogleScholar
className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>"Manage Scholarships</h1></NavLink></li>
    
    {/* manage user */}
    <li><NavLink to='ManageUsers' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users"><MdOutlineManageAccounts
className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>Manage Users</h1></NavLink></li>
 <li><NavLink to='Analytics' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Analytics"><TbDeviceAnalytics

className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>Analytics</h1></NavLink></li>

    </>
}
        </div>
    );
};

export default AdminLink;