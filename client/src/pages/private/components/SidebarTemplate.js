import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import PublicNavBar from "../../../components/Navbar/PublicNavBar";
import useStatesFunc from "../../../hooks/useStatesFunc";
import { Icon } from "@iconify/react";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

const SidebarTemplate = ({ currentUser, navArray, setShowSideBar }) => {
  const [{ sidebar, token }] = useStatesFunc();
  const [clientAddress, setClientAddress] = useState();
  const [solBalance, setSolBalance] = useState();

  const getWallet = async () => {
    const resData = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/wallet/getWallet`,

      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );

    if (resData?.data?.publicKey) {
      setClientAddress(resData?.data?.publicKey);
      setSolBalance((resData?.data?.solBalance / 1000000000).toFixed(2));
    }
  };
  useEffect(() => {
    getWallet();
  }, []);
  return (
    <>
      <div
        style={{
          position: "relative",
          top: "0",
          minHeight: "100vh",
          zIndex: "999",
          background: "#2C2C2E",
        }}
        className={
          sidebar
            ? "side_bar col-8 col-sm-5 col-md-4 col-lg-3 col-xl-1 text-white fixed"
            : "d-none"
        }
      >
        <div className="containe-fluid" sx={{ position: "relative" }}>
          <Button
            className="d-md-none"
            sx={{ position: "absolute", right: "0", top: "10px" }}
            onClick={() => setShowSideBar(false)}
          >
            <Icon icon="fa6-solid:less-than" />
          </Button>

          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "40px",
              marginTop: "20px",
            }}
          >
            <img width="50px" src="/natter.png" alt="" />
          </Typography>
          <nav className="overflow-hidden mt-5">
            <ul className="navbar-nav mb-2 mb-lg-0 py-4">
              {/* <li className="">
                {clientAddress ? (
                  <li style={{ width: "40px", fontSize:"10px" }}>
                    Your Wallet: {clientAddress}
                  </li>
                ) : null}
                {solBalance ? <li>Balance: {solBalance} sol</li> : null}
              </li> */}
              {navArray &&
                navArray.map((navElement, index) => (
                  <li
                    className="nav-item py-2 sidebar-links"
                    key={navElement.href}
                    // onClick={() => setShowSideBar(false)}
                  >
                    <NavLink
                      sx={{ color: "white" }}
                      className={({ isActive }) =>
                        isActive
                          ? "nav-link text-info active fw-bold"
                          : "nav-link text-white"
                      }
                      to={navElement.href}
                      key={navElement.id}
                    >
                      <Typography style={{ fontSize: "30px" }}>
                        {index === 0 ? (
                          <Icon icon="ic:twotone-space-dashboard" />
                        ) : index === 1 || index === 2 ? (
                          <Icon icon="codicon:project" />
                        ) : (
                          <Icon icon="bx:user" />
                        )}
                      </Typography>
                      {/* <Typography> {navElement.name}</Typography> */}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </nav>

          {/* <Typography
            sx={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              width: "100%",
              transform: "translateX(-50%)",
            }}
          >
            <CardHeader
              sx={{ color: "white" }}
              avatar={
                <Avatar sx={{ backgroundColor: "white" }} aria-label="recipe">
                  <Icon
                    color="rgb(29, 155, 240)"
                    icon="akar-icons:twitter-fill"
                  />
                </Avatar>
              }
              title={currentUser?.userName}
              subheader="Membership Status: STANDARD"
            />
          </Typography> */}
        </div>
      </div>
    </>
  );
};

export default SidebarTemplate;
