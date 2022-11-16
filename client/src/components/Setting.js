import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import Dropdownn from "./Dropdownn";
import Settingtable from "./Settingtable";
import { Button } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Setting() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

   <>
     <h1 className="text-white text-center">COMING SOON...</h1>
    {/* <Box
      sx={{
        width: "100%",
        border: 1,
        borderColor: "#00ACEE",
        borderRadius: "10px",
        marginTop: "20px",
        backgroundColor: "#F9F9F9",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="User Guide" {...a11yProps(0)} className="tabtext" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        
        <Typography className="settingcontent">
          <Typography className="tabtext">Connections</Typography>
          <Settingtable />
        </Typography>
        
      </TabPanel>
      <TabPanel value={value} index={0}>
        <Typography
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
          sx={{ backgroundColor: "white", padding: "14px" }}
        >
          <Typography>
            <Typography className="tabtext">wallets</Typography>
          </Typography>
          <Typography component="div">
            <Button variant="contained" className="walletbtn">
              + Edit Profile
            </Button>
          </Typography>
        </Typography>
      </TabPanel>
    </Box> */}
   </>
  );
}
