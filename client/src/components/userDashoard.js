import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import OthersProject from "./OthersProject";
import PastProjects from "./PastProjects";
import ThreadModal from "./ThreadModal";
import TransactionHistory from "./TransactionHistory";
import MentionProjects from "./MentionProjects";
const UserDashboard = ({
  currentUser,
  userProjectsForMention,
  userProjectsForRaid,
  userNotIncludeProjectsForRaid,
  userNotIncludeProjectsForMention,
}) => {
  const [value, setValue] = React.useState("2");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        className="tabs_container"
        sx={{ width: "95%", margin: "0 auto", typography: "body1" }}
      >
        <TabContext value={value}>
          <Box>
            <TabList
              sx={{ gap: "5px" }}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              {/* <Tab
                className="dashboard_tabs"
                sx={{ color: "white" }}
                label="MY PROJECTS"
                value="1"
              /> */}
              <Tab
                className="dashboard_tabs"
                sx={{ color: "white", borderRadius: "20px 20px 0px 0px" }}
                label="TWEETS YOU RAID"
                value="2"
              />
              <Tab
                className="dashboard_tabs"
                sx={{ color: "white", borderRadius: "20px 20px 0px 0px" }}
                label="TWEETS YOU MENTIONED"
                value="3"
              />
            </TabList>
          </Box>

          {/* <Typography
            className="search_div"
            component="div"
            sx={{ display: "flex", width: "50%", marginTop: "40px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} lg={6}>
                <input
                  className="form-control me-2 bg-black"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6}>
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                  >
                    <option selected>All</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </Grid>
            </Grid>
          </Typography> */}

          <ThreadModal />

          <TabPanel
            sx={{ color: "white", padding: "0 !important", marginTop: "40px" }}
            value="2"
          >
            <Grid container spacing={2}>
              {currentUser && (
                <OthersProject
                  currentUser={currentUser}
                  userNotIncludeProjectsForMention={
                    userNotIncludeProjectsForMention
                  }
                  userNotIncludeProjectsForRaid={userNotIncludeProjectsForRaid}
                />
              )}
            </Grid>
          </TabPanel>
          <TabPanel
            sx={{ color: "white", padding: "0 !important", marginTop: "40px" }}
            value="3"
          >
            <Grid container spacing={2}>
              {currentUser &&
                userNotIncludeProjectsForMention &&
                userNotIncludeProjectsForMention?.map((data, i) => (
                  <MentionProjects
                    key={i}
                    currentUsers={currentUser}
                    datas={data}
                    mention={true}
                  />
                ))}
            </Grid>
            {/* <Grid container spacing={2}>
            {currentUser && (
              <PastProjects
                currentUser={currentUser}
                userProjectsForMention={userProjectsForMention}
                userProjectsForRaid={userProjectsForRaid}
              />
            )}
            </Grid> */}
          </TabPanel>
        </TabContext>
      </Box>
      {/* <MentionProjects
                                  currentUsers={props?.auth}
                                  datas={data}
                                  mention={true}
                                /> */}

      <Typography component="div" sx={{background: '#2C2C2E', marginTop:"20px", borderRadius:"20px", margin:"10px", padding:"20px 10px 10px 10px"}}>
          <Typography variant="h5" className="transaction_history" >Transaction History</Typography>
          <TransactionHistory />
      </Typography>
    </>
  );
};

export default UserDashboard;
