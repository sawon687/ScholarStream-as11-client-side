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
            `md:px-4 px-18 py-2 rounded-full  text-center transition-all duration-200 mx-1
            ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
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
            `md:px-4 py-2 px-10 mt-3 mt-  text-center  rounded-full transition-all duration-200 mx-1
            ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                : "text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600"
            }`
          }
        >
          All Scholarships
        </NavLink>
      </li>
    </>
  );

  if (loading) return <Loading />;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="navbar px-4 md:px-10 backdrop-blur-xl bg-white/70 shadow-lg">

        {/* -------- LEFT -------- */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost">
              ☰
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-white rounded-box w-52"
            >
              {links}

              {!user && (
                <>
                  <li className="mt-2">
                    <Link to="/Login" className="btn btn-sm w-full">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/Register"
                      className="btn mt-3 btn-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Logo />
        </div>

        {/* -------- CENTER -------- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">{links}</ul>
        </div>

        {/* -------- RIGHT -------- */}
        <div className="navbar-end flex items-center gap-2">
          {!user ? (
            <>
              {/* Login */}
              <Link
                to="/Login"
                className="px-4 py-2 text-sm md:text-base rounded-full
                border-2 border-indigo-600 text-indigo-600 font-semibold
                hover:bg-indigo-600 hover:text-white transition"
              >
                Login
              </Link>

              {/* Register (Desktop only) */}
              <Link
                to="/Register"
                className="hidden md:inline-block px-5 py-2 rounded-full
                bg-gradient-to-r from-indigo-600 to-purple-600
                text-white font-semibold shadow-md hover:scale-105 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div
              onClick={() => setToggle(!toggle)}
              className="relative cursor-pointer"
            >
              <img
                src={user?.photoURL}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-indigo-600"
              />
            </div>
          )}
        </div>
      </div>

      {/* -------- PROFILE DROPDOWN -------- */}
      {toggle && (
        <div className="absolute right-4 top-16 w-60">
          <ProfileCard />
        </div>
      )}
    </div>
  );
};

export default Navbar;
