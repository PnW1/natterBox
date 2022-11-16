import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Icon } from "@iconify/react";
import CardContent from "@mui/material/CardContent";
import React from "react";
import RewardCards from "./RewardCrads";

import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
const Account = () => {
  const array = [
    { title: "Note", src: "solana.png" },
    { title: "Membership Discounts", src: "ethereum.png" },
  ];

  const statisticsArray = [
    { title: "Whitelists Obtained" },
    { title: "Raffles Entered" },
    { title: "Raffle Tickets Bought" },
    { title: "Raffles Won" },
    { title: "Auctions Won" },
    { title: "Total $FORGE Spent " },
  ];
  return (
    <>
      <Typography
        sx={{  width: "96%", margin: "0 auto", }}
        component="div"
      >
        <RewardCards />

        
      </Typography>
    </>
  );
};

export default Account;
