import React from "react";
import { Link, useNavigate } from "react-router-dom";

import useUserFunc from "../hooks/useUserFunc";

import PrivateNavBar from "./Navbar/PrivateNavBar";
import PublicNavBar from "./Navbar/PublicNavBar";

const Navigation = () => {
  const [checkAuth] = useUserFunc();
  const isAuth = checkAuth();

  return (
    <>
      <PublicNavBar home={true} />
      {/* <nav className="navbar navbar-expand-md navbar-light navBar-background p-3">
        <div className="container-fluid">
        
          <div className={isAuth ? "ms-3" : ""}>
            <Link
              className={
                isAuth
                  ? "navbar-brand brandName p-md-3 p-sm-3 ms-sm-5 ms-5"
                  : "navbar-brand brandName p-md-2 pe-sm-0 "
              }
              to={isAuth ? "/app/dashboard" : "/"}
            >
              Tweets Manager
            </Link>
          </div>
          {isAuth ? <PrivateNavBar /> : <PublicNavBar />}
        </div>
      </nav> */}
    </>
  );
};

export default Navigation;
