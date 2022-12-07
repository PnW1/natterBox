import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import SingleRaider from "./SingleRaider";

const TopRaiders = ({ currentUser,data,
  userNotIncludeProjectsForMention,
}) => {
  const arr = [1, 2, 3,];
  return (
    <>
      <Typography
        component="div"
        sx={{
          background: "#2C2C2E",
          borderRadius: "10.0883px",
          paddingBottom: "10px",
        }}
      >
        <Typography
          style={{
            padding: "20px 20px 0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="white" className="top-raiders">
            Top Raiders
          </Typography>
          <Icon color="white" icon="teenyicons:adjust-horizontal-outline" />
        </Typography>

        {  currentUser &&
          userNotIncludeProjectsForMention &&
          userNotIncludeProjectsForMention?.map((data, i) => (
            <SingleRaider
              key={i}
              currentUsers={currentUser}
              datas={data}
              mention={true}
              data={data}
            />
          ))}
        <Typography style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="outlined"
            style={{
              border: "1px solid #1A1A1A",
              borderRadius: "8px",
              fontSize: "14px",
              color: "white",
            }}
          >
            View all <Icon icon="bi:chevron-double-down" />
          </Button>
        </Typography>
      </Typography>
    </>
  );
};

export default TopRaiders;
