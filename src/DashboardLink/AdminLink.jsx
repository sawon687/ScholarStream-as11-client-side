// src/DashboardLink/AdminLink.jsx
import React from "react";
import useRole from "../Hook/useRole";

import { IoMdAddCircleOutline } from "react-icons/io";
import { FaGoogleScholar } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import Loading from "../pages/Loading";
import SidebarItem from "./SidebarItem";

const AdminLink = () => {
  const { role, isLoading } = useRole();
  if (isLoading) return <Loading />;
  if (role !== "admin") return null;

  return (
    <ul className="space-y-4">
      <SidebarItem to="add-scholarship" icon={<IoMdAddCircleOutline size={20} />} label="Add Scholarship" />
      <SidebarItem to="ManageScholarships" icon={<FaGoogleScholar size={20} />} label="Manage Scholarships" />
      <SidebarItem to="ManageUsers" icon={<MdOutlineManageAccounts size={20} />} label="Manage Users" />
      <SidebarItem to="Analytics" icon={<TbDeviceAnalytics size={20} />} label="Analytics" />
    </ul>
  );
};

export default AdminLink;
