import React from 'react';
import useRole from '../Hook/useRole';
import { NavLink } from 'react-router';
import { MdOutlineManageAccounts, MdOutlineReviews } from 'react-icons/md';

const ModeratorLink = () => {
    const {role,isLoading}=useRole()
    return (
        <div>
            {
                role === 'moderator' && <>
                <li><NavLink to='Manage-Applied-Applications' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Applied Applications"><MdOutlineManageAccounts
                className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>Manage Applied Applications</h1></NavLink></li>
                
                <li><NavLink to='All-Reviews' className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All-Reviews"><MdOutlineReviews
className='font-bold'size={18} /> <h1 className='is-drawer-close:hidden'>All Reviews</h1></NavLink></li>
                </>
            }
        </div>
    );
};

export default ModeratorLink;