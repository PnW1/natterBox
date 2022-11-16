import React from "react";

import SidebarTemplate from "../SidebarTemplate";
import ManagerNavElements from "./ManagerNavElements";

const ManagerSidebar = ({ setShowSideBar, currentUser }) => {
  return (
    <>
      <SidebarTemplate
        navArray={ManagerNavElements}
        currentUser={currentUser}
        setShowSideBar={setShowSideBar}
      />
    </>
  );
};

export default ManagerSidebar;
