import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import Images from "../assets/Images";
import { makeStyles } from "@mui/styles";
import { BsTwitter } from "react-icons/bs";
import RecipeReviewCard from "./RecipeReviewCard";
import AlignItemsList from "./InteractiveList";
import InteractiveList from "./InteractiveList";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
const useStyles = makeStyles((theme) => ({
  MenuItem: {
    backgroundImage: `url(${Images.LandingPageimage})`,
    height: "100vh",
    backgroundSize: "100% 100%",
    paddingTop: "20px",
    backgroundRepeat: "no-repeat",
  },
  banner: {
    backgroundImage: `url(${Images.banner})`,
    height: "100vh",
    backgroundSize: "100% 100%",
    // paddingTop:"140px",

    backgroundRepeat: "no-repeat",
  },
  back: {
    backgroundImage: `url(${Images.twetback})`,
    // height: '100vh',
    // backgroundSize: "100% 100%",

    // backgroundRepeat: "no-repeat",
    // paddingTop: "60px",
    // paddingBottom: "60px",
    // paddingLeft: "20px",
    // paddingRight: "20px",
    color: "white",
  },
  picture: {
    position: "relative",
    backgroundImage: `url(${Images.picture})`,
    height: "55vh",
    backgroundSize: "100% 100%",

    backgroundRepeat: "no-repeat",
    paddingTop: "60px",
    paddingBottom: "60px",
    marginTop: "60px",
    marginBottom: "40px",

    color: "white",
  },
  ConnectTwitterScreens: {
    // position: "relative",
    backgroundImage: `url(${Images.ConnectTwitterScreens})`,
    minHeight: "100vh",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    // backgroundAttachment: "fixed",

    backgroundRepeat: "no-repeat",
    // paddingTop: "60px",
    // paddingBottom: "60px",
    // marginTop: "60px",
    // marginBottom: "40px",

    color: "white",
  },

  backs: {
    // height: '100vh',
    // width: "50%",
    // position: "absolute",
    // right: "5%",
    // top: "40%",
    // transform: "translateY( -40%)",
    // paddingTop: "60px",
    // paddingBottom: "60px",
    // paddingLeft: "20px",
    // paddingRight: "20px",
    color: "black",
  },

  FontFamilyGet: {
    fontFamily: "Raleway",
  },
  formbuton: {
    backgroundColor: "#00ACEE",
    color: "#FFFFFF",
    padding: "10px 20px",

    borderTopLeftRadius: "30px",
    borderBottomRightRadius: "30px",
  },
  formbutons: {
    backgroundColor: "#00ACEE",
    color: "#FFFFFF",
    padding: "10px 0px",
    marginLeft: "15px !important",

    borderTopLeftRadius: "30px",
    borderBottomRightRadius: "30px",
  },
  Paragraph: {
    fontSize: "20px",
  },
  secondcontainer: {
    marginTop: "50px",
  },

  gridcenter: {
    // background:"blue"

    backgroundImage: `url(${Images.banner})`,
    height: "90vh",
    // position: "absolute" ,
    // top: "50%",
    // left: "50%",
    // transform:" translate(-50%, -50%)",
  },
}));

const LandingHome = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    // <InteractiveList />
    // <RecipeReviewCard />
    <Grid
      container
      style={{ position: "relative" }}
      // display={"flex"}
      className={classes.ConnectTwitterScreens}
    >
      <div
        className="home-natterbox-div"
        style={{
          width: "800px",
          position: "absolute",
          top: "50%",
          left: "15%",
          transform: "translate(-15%, -50%)",
        }}
      >
        <Typography
          // gutterBottom
          className="welcome_heading"
          sx={{
            fontSize: { xs: "50px", md: "50px", lg: "60px", xl: "90px" },
          }}
        >
          CHATTERR
          {/* <Typography
            component="span"
            className=" reward_subheading"
            sx={{
              fontSize: { xs: "50px", md: "50px", lg: "60px", xl: "90px" },
            }}
          >
            BOX
          </Typography> */}
        </Typography>
        <Typography
          variant="p"
          gutterBottom
          className="welcome_text"
          sx={{
            fontWeight: "600",
            fontSize: { xs: "14px", md: "15px", lg: "20px", xl: "25px" },
          }}
        >
          The only platform that rewards your mostly loyal holders for their
          daily activity
        </Typography>

        <div className="landingHome-btns">
          <div
            style={{
              marginRight: "20px",
              textDecoration: "none",
            }}
          >
            <Button
              onClick={() => navigate("/Landing")}
              className="raider_btn1"
              variant="contained"
              sx={{
                fontSize: { xs: "7px", md: "9px", lg: "11px", xl: "15px" },
              }}
            >
              <span style={{ marginRight: "5px" }}></span>I WANT TO TWEET
            </Button>
          </div>

          <div
            style={{
              textDecoration: "none",
              // display: "flex",
              // justifyContent: "center",
            }}
          >
            <Button
              onClick={() => navigate("/Landing")}
              className="raider_btn2"
              variant="contained"
              sx={{
                fontSize: { xs: "7px", md: "9px", lg: "11px", xl: "15px" },
              }}
            >
              <span style={{ marginRight: "5px" }}></span>REWARD TWITTER
            </Button>
          </div>
          <Typography sx={{ margin: "5px", paddingLeft: "15px" }}>
            <a href="https://discord.gg/tmy4JVxE" target="_blank">
              {" "}
              <Icon
                className="header-icon text-white me-2"
                icon="radix-icons:discord-logo"
              />
            </a>
          </Typography>
        </div>
      </div>
      <div className="landingHome-img">
        <img src={`${Images.Frame1122}`} />
      </div>
    </Grid>
  );
};

export default LandingHome;
