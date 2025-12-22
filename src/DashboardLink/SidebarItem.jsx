// src/Components/SidebarItem.jsx
import React from "react";
import { NavLink } from "react-router";

const SidebarItem = ({ to, icon, label }) => {
  return (
    <li className="relative group">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg ${
            isActive
              ? "text-white scale-105 bg-gradient-to-r from-indigo-500 to-purple-500"
              : "hover:scale-105 hover:text-white hover:bg-gradient-to-r from-indigo-500 to-purple-500"
          }`
        }
      >
        {icon}
        <span className="is-drawer-close:hidden">{label}</span>
      </NavLink>

      {/* Tooltip */}
      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 rounded-2xl bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out whitespace-nowrap shadow-xl z-50">
        {label}
      </span>
    </li>
  );
};

export default SidebarItem;
