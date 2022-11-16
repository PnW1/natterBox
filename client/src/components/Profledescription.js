import * as React from "react";
import { Icon } from "@iconify/react";
import { styled, useTheme } from "@mui/material/styles";
import Images from "../assets/Images";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import Tabcard from "../components/Tabcard";
// import Search from '../components/Search';

const drawerWidth = 200;

export default function Profledescription({currentUser}) {
  return (
    <>
    <h1 className="text-white text-center">COMING SOON</h1>
      {/* <Typography variant="h5" className="myprofile ">
        My Profile
      </Typography>
      <Typography
        className="maindetail"
        sx={{
          border: 1,
          borderColor: "#00ACEE",
          borderRadius: "10px",
          marginTop: "15px",
        }}
      >
        <Typography component="div">
          <img src={Images.imagebanner} className="imagebanner" />
        </Typography>

        <Typography component="div" className="flexrow">
          <Typography component="div" className="profiledetail">
            <Typography component="div" className="profileimages">
              <Stack direction="row">
                <Avatar
                  className="profile_img"
                  alt="Cindy Baker"
                  src={Images.profile1}
                  sx={{ width: 130, height: 130 }}
                />
              </Stack>
            </Typography>
            <Typography className="profilename" variant="h5">
              {currentUser?.userName}
              <Typography className="sub_profilename">user</Typography>
            </Typography>
          </Typography>

          <Typography
            component="div"
            className="btnedit d-flex align-items-center justify-content-between gap-2"
          >
            <Button variant="contained" className="editprofiles">
              Edit Profile
            </Button>
            <Icon icon="fa:share-alt-square" className="sharebutton"></Icon>
          </Typography>
        </Typography>
      </Typography>
      <Tabcard /> */}
    </>
  );
}
