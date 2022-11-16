import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Icon } from "@iconify/react";
import Dropdownn from "./Dropdownn";

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

export default function Tabcard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: 1,
        borderColor: "#00ACEE",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          className="tab_main"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Gallery" {...a11yProps(0)} className="tabtext" />
          <Tab label="Listing" {...a11yProps(1)} className="tabtext" />
          <Tab label="Staked" {...a11yProps(2)} className="tabtext" />
          <Tab label="Settings" {...a11yProps(3)} className="tabtext" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Typography display={"flex"} justifyContent="space-between">
          <Typography>
            <Typography className="tabtext"> Collections</Typography>
          </Typography>

          <Typography className="iconback" display={"flex"}>
            <Typography className="break">
              <Icon icon="bxs:dashboard" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="charm:share" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="arcticons:unseen-gallery" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="uiw:reload" className="sharebuttons" />
            </Typography>
          </Typography>
        </Typography>
        <Dropdownn />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography display={"flex"} justifyContent="space-between">
          <Typography>
            <Typography className="tabtext"> Collections</Typography>
          </Typography>
          <Typography className="iconback" display={"flex"}>
            <Typography className="break">
              <Icon icon="bxs:dashboard" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="charm:share" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="arcticons:unseen-gallery" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="uiw:reload" className="sharebuttons" />
            </Typography>
          </Typography>
        </Typography>
        <Dropdownn />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography display={"flex"} justifyContent="space-between">
          <Typography>
            <Typography className="tabtext"> Collections</Typography>
          </Typography>
          <Typography className="iconback" display={"flex"}>
            <Typography className="break">
              <Icon icon="bxs:dashboard" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="charm:share" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="arcticons:unseen-gallery" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="uiw:reload" className="sharebuttons" />
            </Typography>
          </Typography>
        </Typography>
        <Dropdownn />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography display={"flex"} justifyContent="space-between">
          <Typography>
            <Typography className="tabtext"> Collections</Typography>
          </Typography>
          <Typography className="iconback" display={"flex"}>
            <Typography className="break">
              <Icon icon="bxs:dashboard" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="charm:share" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="arcticons:unseen-gallery" className="sharebuttons" />
            </Typography>
            <Typography className="break">
              <Icon icon="uiw:reload" className="sharebuttons" />
            </Typography>
          </Typography>
        </Typography>
        <Dropdownn />
      </TabPanel>
    </Box>
  );
}
