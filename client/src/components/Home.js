import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import Images from "../assets/Images";
import useUserFunc from "../hooks/useUserFunc";
import useDispatchFunc from "../hooks/useDispatchFunc";
import { connect } from "react-redux";
import img from "../../src/assets/images/Group1.png";
import { Container, Grid, Typography, Button } from "@mui/material";
import NavigationBar from "../NavigationBar";
import Cards from "./Cards";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
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
    backgroundSize: "100% 100%",

    backgroundRepeat: "no-repeat",
    paddingTop: "60px",
    paddingBottom: "60px",
    paddingLeft: "20px",
    paddingRight: "20px",
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
    position: "relative",
    backgroundImage: `url(${Images.ConnectTwitterScreens})`,
    height: "55vh",
    backgroundSize: "100% 100%",

    backgroundRepeat: "no-repeat",
    paddingTop: "60px",
    paddingBottom: "60px",
    marginTop: "60px",
    marginBottom: "40px",

    color: "white",
  },

  backs: {
    // height: '100vh',
    width: "50%",
    position: "absolute",
    left: "20%",
    top: "40%",
    transform: "translate(-20%, -40%)",
    paddingTop: "60px",
    paddingBottom: "60px",
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
const Home = (props) => {
  const { wallet, connect, sendTransaction, connecting, publicKey } =
    useWallet();
  const [dispatch] = useDispatchFunc();

  const [checkAuth] = useUserFunc();
  const navigate = useNavigate();
  const classes = useStyles();
  const signinUser = async () => {
    dispatch({ type: "loadingStart" });
    const data = { publicKey, twitterId: props.auth.id };
    const response = await axios.patch(
      `${process.env.REACT_APP_SERVERURL}/api/addUserWalletPublicKey`,
      data,
      {
        headers: {
          Authorization: `BEARER ${props.auth.token}`,
        },
      }
    );

    dispatch({ type: "loadingStop" });
    if (props.auth) {
      // toast.success(data.msg);
      //save it to localStorage
      dispatch({
        type: "signin",
        payload: {
          token: props.auth.token,
          role: props.auth.role,
          idVerified: props.auth.isVerified,
          twitterId: props?.auth?.id,
          accessToken: props?.auth?.accessToken,
          accessTokenSecret: props?.auth?.accessTokenSecret,
        },
      });
      navigate("/app/dashboard");
    } else {
      // toast.error(data.msg);
    }
  };

  useEffect(() => {
    if (publicKey && props.auth) {
      signinUser();
    }
  }, [publicKey, props.auth]);
  useEffect(() => {
    if (checkAuth()) {
      navigate("/app");
    }
  }, [checkAuth]);

  if (publicKey) {
    if (!props.auth) {
      return (
        <div className="p-md-5 p-2 py-5 my-5 bg-light container border border-1 border-info rounded-3 text-center">
          <div className="bg-white">
            <div className="p-md-5 p-3 ">
              <div className="text-center display-2">Welcome</div>
            </div>

            <div className="p-md-5 p-3  d-flex  justify-content-center gap-3">
              <Link
                to="/user/LoginPage"
                className="btn btn-info border-info text-white"
              >
                Link Twitter
              </Link>
              <WalletDisconnectButton />
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <>
        <div className="banner">
          <NavigationBar />
          <Container maxWidth="lg">
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={12} md={6} lg={5} className="Paragraph">
                <p className="home_text">
                  Reward Loyal <br /> Supporters with Our <br /> Tweet to Earn{" "}
                  <br /> Platform
                </p>
                <div className="wallet-btn-div">
                  <Button className="wallet-btn" variant="contained">
                    Registeration
                  </Button>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={5}
                display="flex"
                justifyContent="center"
              >
                <img
                  className="home_img"
                  src={img}
                  alt="main img"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container maxWidth="lg">
          <Grid container md={12} lg={12} className={classes.secondcontainer}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              justifyContent="center"
              alignItems="center"
              display={"flex"}
            >
              <Typography
                variant="p"
                gutterBottom
                id="steps_to_folow"
                className={classes.Paragraph}
              >
                Steps to Follow
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Cards />

        <Container maxWidth="md">
          <Grid
            container
            md={12}
            lg={12}
            display={"flex"}
            className={classes.picture}
          >
            <Grid item md={12} sm={12} lg={12}>
              <Grid item md={5} sm={5} lg={5} className={classes.backs}>
                <Typography variant="p" gutterBottom className="reward_text">
                  SET UP YOUR REWARD <br /> PROGRAMME
                </Typography>
                <Typography
                  variant="body1"
                  id="reward_pro_para"
                  gutterBottom
                  className="reward_desc"
                >
                  Decide on time frame and how much you would like to reward
                  them with
                </Typography>
                <NavLink style={{ textDecoration: "none" }} to="/Signup">
                  <Button className="registeration" variant="contained">
                    Registeration
                  </Button>
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md">
          <Grid
            container
            md={12}
            lg={12}
            display={"flex"}
            className={classes.ConnectTwitterScreens}
          >
            <Grid item md={12} sm={12} lg={12}>
              <Grid item md={5} sm={5} lg={5} className={classes.backs}>
                <Typography variant="p" gutterBottom className="reward_text">
                  SET UP YOUR REWARD <br /> PROGRAMME
                </Typography>
                <Typography
                  variant="body1"
                  id="reward_pro_para"
                  gutterBottom
                  className="reward_desc"
                >
                  Decide on time frame and how much you would like to reward
                  them with
                </Typography>
                <NavLink style={{ textDecoration: "none" }} to="/Signup">
                  <Button className="registeration" variant="contained">
                    Registeration
                  </Button>
                </NavLink>
              </Grid>
            </Grid>
            {/* <Grid
              item
              xs={5}
              md={3}
              lg={3}
              justifyContent="center"
              display={"flex"}
              alignItems="center"
            >
              <NavLink style={{ textDecoration: "none" }} to="/Signup">
                <Button className="registeration" variant="contained">
                  Registeration
                </Button>
              </NavLink>
            </Grid> */}
          </Grid>
        </Container>

        <div
          maxWidth="lg"
          style={{ position: "relative" }}
          className={classes.gridcenter}
        >
          <Grid
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            container
            md={12}
            lg={12}
            paddingTop="170px"
            justifyContent="center"
            alignItems="center"
            display={"flex"}
          >
            <Grid item xs={12} sm={6} lg={6} className={classes.back}>
              <Typography
                variant="h5"
                gutterBottom
                marginBottom="15px"
                className={classes.Paragraph}
              >
                TWEET TO EARN
              </Typography>
              <Typography
                id="footer_para"
                variant="body1"
                gutterBottom
                marginBottom="50px"
                letterSpacing="2px"
                className={classes.Paragraph}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget
                duis at tellus at urna.
              </Typography>
              <Typography
                variant="p"
                className={classes.formbuton}
                gutterBottom
              >
                Connect wallet
              </Typography>
            </Grid>
            <Grid className="text-center" item xs={12} sm={6} lg={4}>
              <img
                className="footer-img ms-auto"
                src={Images.twitter}
                alt="main img"
                style={{ width: "70%" }}
              />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
};
function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Home);
