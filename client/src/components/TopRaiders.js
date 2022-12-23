import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import SingleRaider from "./SingleRaider";

const TopRaiders = ({
  currentUser,
  data,
  userNotIncludeProjectsForMention,
}) => {
  const arr = [1, 2, 3];

  // const user = userNotIncludeProjectsForMention?.filter(
  //   (elem) => elem.projectTwitterUsername == currentUser
  // );
  // console.log("mycurrentuser", userNotIncludeProjectsForMention);
  // console.log("mycurrentuser", data[0].projectTwitterUsername);
  // console.log("mycurrentuser", user);
  console.log("mycurrentuser", currentUser);
  console.log("userfilter", currentUser.rewardStatus[0].tweetText);
  // if (data && currentUser) {
  //   const found = data.find(
  //     (element) => element.projectTwitterUsername == currentUser
  //   );

  //   console.log("mycurrentuser", found);
  // }

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
            Rewards
          </Typography>
          <Icon color="white" icon="teenyicons:adjust-horizontal-outline" />
        </Typography>

        {currentUser &&
          currentUser.rewardStatus.map((data) => (
            <SingleRaider currentUsers={data} />
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
