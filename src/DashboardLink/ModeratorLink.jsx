// src/DashboardLink/ModeratorLink.jsx
import React from "react";
import useRole from "../Hook/useRole";

import { MdOutlineManageAccounts, MdOutlineReviews } from "react-icons/md";
import Loading from "../pages/Loading";
import SidebarItem from "./SidebarItem";

const ModeratorLink = () => {
  const { role, isLoading } = useRole();

  if (isLoading) return <Loading />;
  if (role !== "moderator") return null;

  return (
    <ul className="space-y-4">
      <SidebarItem
        to="Manage-Applied-Applications"
        icon={<MdOutlineManageAccounts size={20} />}
        label="Manage Applied Applications"
      />
      <SidebarItem
        to="All-Reviews"
        icon={<MdOutlineReviews size={20} />}
        label="All Reviews"
      />
    </ul>
  );
};

export default ModeratorLink;
