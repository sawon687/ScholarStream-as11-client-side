

import { NavLink, Outlet } from 'react-router';
import logo from '../../src/assets/logo (3).png'
import UseAuth from '../Hook/UseAuth';
import {  IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { FaGoogleScholar } from 'react-icons/fa6';
import { HiOutlineDocumentCheck } from 'react-icons/hi2';
const DashboardLayout = () => {
    const {user}=UseAuth()
    
    return (
        <>
           <div className="drawer lg:drawer-open">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Navbar */}
    <nav className="navbar flex justify-between w-full bg-base-300 ">
     <div className='flex'>
         <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
        {/* Sidebar toggle icon */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
      </label>
      <div className="px-4 text-2xl fontbold">Dashboard</div>
     </div>

      <div className='flex items-center gap-3 pr-15'><img className='w-15 h-15 rounded-full' src={user?.photoURL} alt="" />
      <h1 className='font-bold text-xl text-gray-600'>{user?.displayName}</h1></div>
    </nav>
    {/* Page content here */}
   <Outlet></Outlet>
  </div>

  <div className="drawer-side is-drawer-close:overflow-visible">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      {/* Sidebar content here */}
      <ul className="menu w-full grow">
       <li>
             <NavLink className='is-drawer-close:tooltip is-drawer-close:tooltip-right flex' data-tip='ScholarStream'>  <img className='w-10 h-10' src={logo} alt="" /> 
              <h1 className='text-primary text-2xl font-bold is-drawer-close:hidden'>ScholarStream</h1></NavLink>
          
          
            
         
        </li>
        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
            {/* Home icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
            <span className="is-drawer-close:hidden">Homepage</span>
          </button>
        </li>
        
        <li><NavLink to='add-scholarship' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Scholarship"><IoMdAddCircleOutline  className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>Add Scholarship</h1></NavLink></li>
        <li><NavLink to='ManageUsers' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users"><MdOutlineManageAccounts
className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>Manage Users</h1></NavLink></li>
<li><NavLink to='ManageScholarships' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Scholarships"><FaGoogleScholar
className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>Manage Users</h1></NavLink></li>
<li><NavLink to='My-Applications' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Applications"><HiOutlineDocumentCheck
className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>My Applications</h1></NavLink></li>

<li><NavLink to='Manage-Applied-Applications' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Applied Applications"><HiOutlineDocumentCheck
className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>My Applications</h1></NavLink></li>


        {/* List item */}
        <li>
          <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
            {/* Settings icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
            <span className="is-drawer-close:hidden">Settings</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div> 
        </>
    );
};

export default DashboardLayout;