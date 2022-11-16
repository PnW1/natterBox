import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Grid } from "@mui/material";

const TotalRaids = ({ rewardData }) => {
  const arr = [1];
  return (
    <>
      {arr.map((item, i) => {
        return (
          <Grid key={i} item xs={12} md={12} lg={6} xl={6}>
            <Typography
              component="div"
              sx={{
                padding: "10px",
                background:
                  "linear-gradient(98.97deg, #2C2C2E 1.64%, rgba(0, 0, 0, 0.5) 102.85%)",
                border: "1px solid #313131",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div
                className=""
                style={{
                  width: "55px",
                  height: "45px",

                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.03)",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  backdropFilter: "blur(2px)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon color="#47DDFC" icon="ant-design:retweet-outlined" />
              </div>
              <div className="total_raids_div" style={{ width: "100%" }}>
                <div className="d-flex justify-content-between align-items-center text-white mb-1">
                  <p className="mb-0" style={{ fontSize: "11px" }}>
                    Total Raids
                  </p>
                  <div
                    className="raids_card"
                    component="div"
                    style={{
                      fontSize: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p className="mb-0">{rewardData?.raidCount}</p>
                    <p className="mb-0" style={{ color: "#47DDFC" }}>
                      34% <Icon icon="eva:arrow-upward-fill" />
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center text-white">
                  <div>
                    <p className="mb-0" style={{ fontSize: "11px" }}>
                      Total Mention
                    </p>
                  </div>
                  <div
                    className="raids_card"
                    component="div"
                    style={{
                      fontSize: "10px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p className="mb-0">{rewardData?.mentionCount}</p>
                    <p className="mb-0" style={{ color: "#47DDFC" }}>
                      34% <Icon icon="eva:arrow-upward-fill" />
                    </p>
                  </div>
                </div>
              </div>
            </Typography>
          </Grid>
        );
      })}
    </>
  );
};

export default TotalRaids;
