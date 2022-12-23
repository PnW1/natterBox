import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const SingleRaider = ({ currentUsers }) => {
  const [refreshpage, setrefreshpage] = useState(true);

  return (
    <div>
      <Typography
        sx={{
          background:
            "linear-gradient(98.97deg, #2C2C2E 1.64%, rgba(0, 0, 0, 0.5) 102.85%)",
          border: "1px solid #313131",
          borderRadius: "12px",
          margin: "0 5px 5px 0",
        }}
      >
        <CardHeader
          className="nft-blaze"
          sx={{
            // position: "absolute",
            padding: "10px 10px 10px 10px",
            bottom: "0",
            left: "0",
            width: "100%",
            color: "white",
          }}
          avatar={
            <Avatar
              sx={{
                bgcolor: red[500],
              }}
              aria-label="recipe"
            >
              {currentUsers.projectName.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              sx={{
                color: "white",
              }}
            >
              {/* <MoreVertIcon /> */}

              {currentUsers.isRewardpaid ? (
                <Typography
                  className="raids_card"
                  component="div"
                  sx={{
                    width: "67px",
                    fontSize: "17px",
                    height: "44px",
                    // background: "#00ACEE",
                    // borderRadius: "50px 0px 0px 50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#47DDFC",
                  }}
                >
                  {currentUsers.isRewardpaid} SOL
                </Typography>
              ) : (
                <Typography
                  className="raids_card"
                  component="div"
                  sx={{
                    width: "67px",
                    fontSize: "17px",
                    height: "44px",
                    // background: "#00ACEE",
                    // borderRadius: "50px 0px 0px 50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#47DDFC",
                  }}
                >
                  <IconButton onClick={() => setrefreshpage(!refreshpage)}>
                    <AutorenewIcon
                      sx={{
                        color: "#47DDFC",
                      }}
                    />
                  </IconButton>
                </Typography>
              )}
            </IconButton>
          }
          title={currentUsers?.projectName}
          subheader={
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              {currentUsers.tweetText}
            </Typography>
          }
        />
      </Typography>
    </div>
  );
};

export default SingleRaider;
