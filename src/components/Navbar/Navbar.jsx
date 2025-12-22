import React, { useState } from "react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import UseAuth from "../../Hook/UseAuth";
import ProfileCard from "../DropdownProfile/ProfileCard";
import Loading from "../../pages/Loading";

const Navbar = () => {
  const { user, loading } = UseAuth();
  const [toggle, setToggle] = useState(false);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-200 mx-2
        ${
          isActive
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105"
            : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600"
        }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allScholarship"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-200 mx-2
        ${
          isActive
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105"
            : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600"
        }`
          }
        >
          All Scholarships
        </NavLink>
      </li>
    </>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full fixed z-50 top-0  left-0">
      {/* ---------------- NAVBAR MAIN ---------------- */}
      <div className="navbar md:px-15 rounded-2xl backdrop-blur-xl bg-white/30 border-b border-white/20 shadow-lg">
        
        {/* ------------ LEFT ------------ */}
        <div className="navbar-start ">
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 bg-white/80 backdrop-blur-lg rounded-2xl p-3 shadow-xl border border-white/20 w-52"
            >
              {links}
            </ul>
          </div>

          <Logo />
        </div>

        {/* ------------ CENTER ------------ */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* ------------ RIGHT ------------ */}
        <div className="navbar-end">
          {!user ? (
            <>
              <Link
                to="/Login"
                className="px-5 py-2 rounded-full border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                Log in
              </Link>

              <Link
                to="/Register"
                className="ml-2 px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-all duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <div
              onClick={() => setToggle(!toggle)}
              className="relative cursor-pointer ml-4"
            >
              <img
                src={user?.photoURL}
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg hover:scale-105 transition-transform duration-300"
                alt=""
              />

              {/* Avatar Glow Animation */}
              <span className="absolute inset-0 blur-xl rounded-full bg-purple-500 opacity-30 -z-10"></span>
            </div>
          )}
        </div>
      </div>

      {/* ------------ DROPDOWN PROFILE BOX ------------ */}
      {toggle && (
        <div className="absolute right-5 top-20 w-60 animate-fadeIn">
          <ProfileCard />
        </div>
      )}
    </div>
  );
};

export default Navbar;
