import React from "react";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import UserMentions from "./UserMentions";
import RewardCards from "./RewardCrads";
import LiveRewards from "./liveRewards";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";

const array = [1, 2, 3, 4, 5, 6];
const Rewards = () => {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        className="tabs_container"
        sx={{
          width: "95%",
          margin: "0 auto",
          typography: "body1",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "#00ACEE" }}>
            <TabList
              sx={{ gap: "5px" }}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                className="dashboard_tabs"
                sx={{ color: "white" }}
                label="REWARDS"
                value="3"
              />
              <Tab
                className="dashboard_tabs"
                sx={{ color: "white" }}
                label="LIVE"
                value="1"
              />
              <Tab
                className="dashboard_tabs"
                sx={{ color: "white" }}
                label="CLOSED"
                value="2"
              />
            </TabList>
          </Box>

          <TabPanel
            sx={{
              color: "white",
              padding: "0 !important",
              marginTop: "30px",
            }}
            value="1"
          >
            <Grid container spacing={2}>
              <LiveRewards />
            </Grid>
          </TabPanel>
          <TabPanel
            sx={{
              color: "white",
              padding: "0 !important",
              marginTop: "30px",
            }}
            value="2"
          >
            <Grid container spacing={2}>
              <LiveRewards />
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Rewards;
