import { Grid } from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";
const arr = [
  {
    title: "Total Raids",
    no: "$220",
  },
  {
    title: "Total Reward",
    no: "0.050 sol",
  },
  {
    title: "Avg. SOL per Raid",
    no: "0.025 sol",
  },
];
const RaidsCountWidget = () => {
  return (
    <>
      {arr.map((item, i) => {
        return (
          <Grid key={i} item xs={12} md={6} lg={4} sx={{ padding: "10px" }}>
            <div
              className="d-flex justify-content-around align-items-center text-white"
              style={{
                background:
                  "linear-gradient(98.08deg, rgba(24, 24, 24, 0.04) 6.13%, rgba(49, 49, 49, 0.56) 103.17%)",
                boxShadow: "inset 26px -26px 33px rgba(0, 0, 0, 0.18)",
                borderRadius: "8px",
                padding: "19px 16px 19px 10px",
              }}
            >
              <div className="d-flex gap-2 align-items-center">
                <div>
                  <p style={{ fontSize: "36px" }}>
                    <Icon color="#47DDFC" icon="raphael:linechart" />
                  </p>
                </div>
                <div className="">
                  <p style={{ fontSize: "14px", marginBottom: "0px" }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: "30px", marginBottom: "0px" }}>
                    {item.no}
                  </p>
                </div>
              </div>
              <div style={{ color: "#47DDFC", fontSize: "17px" }}>12.2% @</div>
            </div>
          </Grid>
        );
      })}
    </>
  );
};

export default RaidsCountWidget;
