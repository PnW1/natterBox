import React from "react";

import SidebarTemplate from "../SidebarTemplate";
import AdminNavArray from "./AdminNavElements";

const AdminSidebar = ({currentUser, setShowSideBar}) => {
  return (
    <>
      <SidebarTemplate navArray={AdminNavArray} currentUser={currentUser} setShowSideBar={setShowSideBar} />
    </>
  );
};

export default AdminSidebar;
