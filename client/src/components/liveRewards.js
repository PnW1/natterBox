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

const array = [1, 2, 3, 4, 5, 6];
const LiveRewards = () => {
  return (
    <>
      {array.map((item, i) => {
        return (
          <Grid
            key={i}
            item
            xs={12}
            md={6}
            lg={4}
            sx={{ position: "relative", marginBottom: "30px" }}
          >
            <div className="penta gon " style={{ background: "#333333" }}>
              <Card
                className="card_rewards"
                sx={{
                  width: "100%",
                  color: "white",

                  minHeight: "570px",
                }}
              >
                <CardHeader
                  className="card_header"
                  sx={{
                    marginLeft: "100px",
                    marginTop: "30px",
                    color: "white",
                  }}
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  }
                  title="projectName"
                  subheader="projectTwitterUsername"
                />

                <Typography
                  variant="body2"
                  color="white"
                  sx={{
                    textAlign: "center",
                    background: "#545454",
                    margin: "20px",
                    borderRadius: "10px",
                    padding: "10px 0px 0 0px",
                    // marginTop: "90px",
                  }}
                >
                  <Typography sx={{ display: "", justifyContent: "center" }}>
                    <Typography
                      className="magic_eden"
                      variant="h7"
                      sx={{
                        fontSize: "19.4351px",
                        justifyContent: "end",
                      }}
                    >
                      @BlocksmithLabs
                    </Typography>
                    <br />
                    {/* <Typography
                                className="magic_eden"
                                variant="h7"
                                sx={{ fontSize: "18px", justifyContent: "end" }}
                              >
                                magic
                              </Typography> */}
                  </Typography>
                  <Typography
                    className="magic_eden_desc"
                    sx={{ fontSize: "13.6045px", padding: "10px" }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been. Lorem Ipsum is
                    simply dummy........
                  </Typography>

                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      background: "#636363",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                    disableSpacing
                  >
                    <IconButton
                      aria-label="add to favorites"
                      sx={{ gap: "10px", fontSize: "20px" }}
                    >
                      <Icon color="white" icon="ant-design:heart-filled" />
                      <Typography
                        variant="p"
                        sx={{ color: "white", fontSize: "16px" }}
                      >
                        127
                      </Typography>
                    </IconButton>

                    <IconButton
                      aria-label="share"
                      sx={{ gap: "10px", fontSize: "20px" }}
                    >
                      <Icon color="white" icon="ant-design:retweet-outlined" />
                      <Typography
                        variant="p"
                        sx={{ color: "white", fontSize: "16px" }}
                      >
                        97
                      </Typography>
                    </IconButton>

                    <IconButton
                      aria-label="share"
                      sx={{ gap: "10px", fontSize: "20px" }}
                    >
                      <Icon
                        sx={{ fontSize: "12px" }}
                        color="white"
                        // onClick={() => setOpenModal(true)}
                        icon="fa-regular:comment-dots"
                      />
                      <Typography
                        variant="p"
                        sx={{ color: "white", fontSize: "16px" }}
                      >
                        101
                      </Typography>
                    </IconButton>
                    <IconButton aria-label="share" sx={{ fontSize: "20px" }}>
                      <Icon color="white" icon="ci:share" />
                    </IconButton>
                  </CardActions>
                </Typography>

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <CardActions
                      sx={{
                        justifyContent: "space-between",
                        borderBottom: "1px solid gray",
                        padding: "unset !important",
                      }}
                      disableSpacing
                    >
                      <IconButton
                        className="iconBtn"
                        sx={{
                          fontSize: "13px",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        aria-label="add to favorites"
                      >
                        <Icon icon="bi:clock-history" /> Closed
                      </IconButton>

                      <IconButton
                        className="iconBtn"
                        sx={{ fontSize: "12px", gap: "5px" }}
                        aria-label="share"
                      >
                        <Typography className="active_icon2"></Typography>
                        Ended at 2022-04-26)
                      </IconButton>
                    </CardActions>

                    <CardActions
                      sx={{
                        justifyContent: "space-between",
                        borderBottom: "1px solid gray",
                        padding: "unset !important",
                      }}
                      disableSpacing
                    >
                      <IconButton
                        className="iconBtn"
                        sx={{
                          fontSize: "13px",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        aria-label="add to favorites"
                      >
                        <Icon icon="arcticons:rewards" /> $FORGE Reward
                      </IconButton>

                      <IconButton
                        className="iconBtn"
                        sx={{ fontSize: "12px", gap: "5px" }}
                        aria-label="share"
                      >
                        1 $FORGE
                      </IconButton>
                    </CardActions>

                    <CardActions
                      sx={{
                        justifyContent: "space-between",
                        borderBottom: "1px solid gray",
                        padding: "unset !important",
                      }}
                      disableSpacing
                    >
                      <IconButton
                        className="iconBtn"
                        sx={{
                          fontSize: "13px",
                          alignItems: "center",
                          gap: "5px",
                        }}
                        aria-label="add to favorites"
                      >
                        <Icon icon="bi:clock-history" /> Tweet Created At
                      </IconButton>

                      <IconButton
                        className="iconBtn"
                        sx={{ fontSize: "12px", gap: "5px" }}
                        aria-label="share"
                      >
                        Mon Apr 25 18:30:51
                      </IconButton>
                    </CardActions>
                  </Typography>
                </CardContent>
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button variant="contained" className="winners_btn">
                    View Winners
                  </Button>
                </Typography>
              </Card>
            </div>

            <div
              className="triangle"
              style={{ background: "#5DCA37", color: "white" }}
            >
              <img className="mail_logo" src="reward.png" alt="" />
            </div>
          </Grid>
        );
      })}
    </>
  );
};

export default LiveRewards;
