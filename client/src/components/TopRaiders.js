import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

const TopRaiders = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
        {arr.map((item, i) => (
          <Typography sx={{background: 'linear-gradient(98.97deg, #2C2C2E 1.64%, rgba(0, 0, 0, 0.5) 102.85%)',
            border: '1px solid #313131',
            borderRadius: '12px', margin:"0 5px 5px 0"}} key={i}>
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
                  R
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
                      color:"#47DDFC"
                    }}
                  >
                    + 2SOL
                  </Typography>
                </IconButton>
              }
              title="NFT Blaze"
              subheader="@huehewiuewjiw"
            />
          </Typography>
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
