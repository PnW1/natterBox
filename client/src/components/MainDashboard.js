import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import axios from "axios";
import useStatesFunc from "../hooks/useStatesFunc";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

import TotalRaids from "./TotalRaids";
import TransactionHistory from "./TransactionHistory";
import History from "./History";
import RaidsHistory from "./raidsHistory";
import ChartApp from "./ChartApp";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#47DDFC" : "#308fe8",
  },
}));

const BorderLinearProgress2 = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  width: 50,
  borderRadius: 3,
  backgroundColor: "transparent",

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "transparent" ? 100 : 1000],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#47DDFC" : "#47DDFC",
  },
}));

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        style={{ width: "150px", height: "150px", color: "#00ACEE" }}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
          sx={{ textAlign: "center" }}
        >
          <Typography variant="p" sx={{ fontSize: "28px" }}>{`${Math.round(
            props.value
          )}`}</Typography>
          {/* <Typography variant='p' sx={{fontSize:"15px"}}>Total Operations</Typography> */}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const MainDashboard = () => {
  const [{ token }] = useStatesFunc();
  const [progress, setProgress] = useState(56235);
  const [rewardData, setRewardData] = useState();

  //   React.useEffect(() => {
  //     const timer = setInterval(() => {
  //       setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
  //     }, 800);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);

  const userRewardDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/reward/getUserRewardDetail`,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
    setRewardData(res.data);
  };

  useEffect(() => {
    userRewardDetails();
  }, []);

  return (
    <div>
      <Grid container sx={{ padding: "10px" }}>
        <Grid
          item
          xs={11}
          lg={7.5}
          sx={{
            background: "#2C2C2E",
            borderRadius: "12px",
            color: "white",
            padding: "10px",
            margin: "0 auto",
          }}
        >
          <Typography
            className="total_visits_div"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "50px 20px 50px 20px",
              width: "100%",
            }}
          >
            <Typography
              className="total_visits"
              sx={{ width: "30%" }}
              variant="h5"
            >
              Total visits
            </Typography>
            <Typography
              className="provision_months_div"
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: "50px",
                width: "70%",
              }}
            >
              <Typography
                className="provision_month"
                sx={{ color: "rgba(235, 235, 245, 0.3)" }}
              >
                Provisions Month
              </Typography>
              <Typography
                className="provision_month"
                sx={{
                  background:
                    "linear-gradient(98.97deg, #2C2C2E 1.64%, rgba(0, 0, 0, 0) 102.85%)",
                  border: "1px solid #3D3C41",
                  borderRadius: "5px",
                  padding: "10px 15px 10px 15px",
                  fontSize: "14px",
                }}
              >
                {" "}
                AUG 2022 <Icon color="#47DDFC" icon="uil:calender" />
              </Typography>
              <Typography
                sx={{
                  background:
                    "linear-gradient(98.97deg, #2C2C2E 1.64%, rgba(0, 0, 0, 0) 102.85%)",
                  border: "1px solid #3D3C41",
                  borderRadius: "5px",
                  padding: "10px 15px 10px 15px",
                }}
              >
                <Icon color="#47DDFC" icon="charm:menu-meatball" />
              </Typography>
            </Typography>
          </Typography>
          <ChartApp />

          <Grid container sx={{ marginTop: "30px", width: "100%" }}>
            <Grid
              item
              xs={11}
              md={4}
              sx={{ padding: "50px", margin: "0 auto" }}
            >
              <CircularProgressWithLabel value={progress} />
              <br />
              <br />
              <BorderLinearProgress variant="determinate" value={50} />
              <Typography
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <Typography
                  component="div"
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <Typography component="p">
                    <BorderLinearProgress2 variant="determinate" value={50} />
                  </Typography>
                  <Typography
                    component="p"
                    sx={{
                      fontSize: "11.3px",
                      color: "rgba(235, 235, 245, 0.3)",
                    }}
                  >
                    {" "}
                    Online
                  </Typography>
                </Typography>
                <Typography
                  component="div"
                  sx={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <BorderLinearProgress2 variant="determinate" value={50} />
                  <Typography
                    component="p"
                    sx={{
                      fontSize: "11.3px",
                      color: "rgba(235, 235, 245, 0.3)",
                    }}
                  >
                    {" "}
                    Offline
                  </Typography>
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <h3 className="history">Mentions History</h3>
              <History rewardData={rewardData} />

              <h3 className="history">Raids History</h3>
              <RaidsHistory rewardData={rewardData} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4.5} sx={{ padding: "0 5px 5px 5px" }}>
          <Typography
            component="div"
            sx={{
              background: "#2C2C2E",
              borderRadius: "12px",
              padding: "30px 10px 30px 10px",
              margin: "0 10px 10px 10px",
              position: "relative",
            }}
          >
            <Typography
              component="div"
              sx={{ color: "white", display: "flex", justifyContent: "center" }}
            >
              <Typography variant="p">
                {" "}
                Available to Claim <br />
                <Typography variant="p" className="available_to_claim">
                  {" "}
                  15.3569 <sub className="btn_sub">SOL</sub>{" "}
                </Typography>{" "}
              </Typography>
            </Typography>
            <Typography
              component="div"
              sx={{
                position: "absolute",
                color: "white",
                top: "50px",
                right: "10px",
              }}
            >
              <Typography variant="p"> Claim </Typography>
            </Typography>

            <Grid container>
              <TotalRaids rewardData={rewardData} />
            </Grid>
          </Typography>
          <Typography
            component="div"
            sx={{
              background: "#2C2C2E",
              borderRadius: "12px",
              padding: "10px",
              margin: "10px",
            }}
          >
            <h3 className="transaction_history">Transaction History</h3>
            <TransactionHistory rewardData={rewardData} />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainDashboard;
