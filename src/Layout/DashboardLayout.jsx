// src/Layout/DashboardLayout.jsx
import { NavLink, Outlet } from "react-router";
import logo from "../../src/assets/logo (3).png";
import UseAuth from "../Hook/UseAuth";
import useRole from "../Hook/useRole";

import { MdOutlineReviews } from "react-icons/md";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import AdminLink from "../DashboardLink/AdminLink";
import ModeratorLink from "../DashboardLink/ModeratorLink";

import Loading from "../pages/Loading";
import SidebarItem from "../DashboardLink/SidebarItem";

const DashboardLayout = () => {
  const { user, loading } = UseAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) return <Loading />;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content">
        {/* NAVBAR */}
        <nav className="navbar fixed top-0 left-0 flex justify-between items-center w-full h-20 bg-white/10 backdrop-blur-3xl border-b border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.2)] px-6 text-white z-50 transition-all duration-300">
          <div className="flex items-center gap-4">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost bg-white/20 hover:bg-white/30 border border-white/20 rounded-xl shadow-md backdrop-blur-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M4 6h16"></path>
                <path d="M4 12h16"></path>
                <path d="M4 18h16"></path>
              </svg>
            </label>
            <h1 className="text-3xl font-black tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              Dashboard
            </h1>
          </div>

          {/* PROFILE */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="flex items-center cursor-pointer gap-3 p-2 hover:bg-white/10 rounded-2xl transition-all duration-300">
              <img className="w-12 h-12 rounded-full border-2 border-white/40 shadow-md hover:scale-105 transition-all duration-300" src={user?.photoURL} alt="profile" />
              <span className="hidden lg:block font-semibold text-lg drop-shadow-sm">{user?.displayName}</span>
            </label>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <div className="p-6 relative pt-28 bg-gradient-to-br from-purple-900 via-indigo-900 to-black min-h-screen">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side bg-white">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col items-start backdrop-blur-3xl border border-white/10 shadow-lg transition-all duration-300 is-drawer-close:w-16 is-drawer-open:w-64 rounded-r-3xl">
          {/* LOGO */}
          <NavLink className="flex items-center gap-3 mx-auto mb-4 mt-4">
            <img className="w-12 h-12 drop-shadow-md" src={logo} alt="logo" />
            <h1 className="is-drawer-close:hidden bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text text-2xl font-black tracking-wide">ScholarStream</h1>
          </NavLink>

          <ul className="menu w-full grow pt-4 space-y-4">
            {/* PROFILE */}
            <SidebarItem to="My-Profile" icon={<CgProfile size={20} />} label="My Profile" />

            {/* HOME */}
            <SidebarItem to="/" icon="🏠" label="Homepage" />

            {/* STUDENT LINKS */}
            {role === "student" && (
              <>
                <SidebarItem to="My-Applications" icon={<HiOutlineDocumentCheck size={20} />} label="My Applications" />
                <SidebarItem to="My-Reviews" icon={<MdOutlineReviews size={20} />} label="My Reviews" />
              </>
            )}

            {/* ADMIN */}
            <AdminLink />

            {/* MODERATOR */}
            <ModeratorLink />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
