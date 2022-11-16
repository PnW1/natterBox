import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import { Icon } from "@iconify/react";
// import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import UserMentions from "./UserMentions";

import Images from "../assets/Images";
import { HiChevronDoubleDown } from "react-icons/hi";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  margin: "auto ",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const moment = require("moment");

const MentionProjects = ({ currentUsers, datas, mention }) => {
  const [currentUserr, setcurrentUser] = React.useState(currentUsers);
  const [dataa, setdata] = React.useState(datas);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Grid item xs={12} md={6} lg={4} xl={3} sx={{ position: "relative" }}>
        {/* <div className=""> */}
        <Card
        sx={{ maxWidth: 345, backgroundColor: "black", borderRadius: "17px", margin:"0 auto" }}
      >
        <Typography
          component="div"
          sx={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%) ,url("${Images.mentionCardImg}")`,
            height: "194px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <CardHeader
            sx={{
              position: "absolute",
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
                <MoreVertIcon />
              </IconButton>
            }
            title={datas?.projectName}
            subheader={`@${datas?.projectTwitterUsername}`}
          />
        </Typography>
    

       {!mention ? ( 
        <>
        <CardContent>
          <Typography variant="body2" color="white">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <Typography
          component="div"
          sx={{ paddingLeft: "10px", paddingRight: "10px" }}
        >
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
                        <Icon icon="bi:clock-history" /> Date
                      </IconButton>

                      <IconButton
                        className="iconBtn"
                        sx={{ fontSize: "12px", gap: "5px" }}
                        aria-label="share"
                      >
                        <Typography className="active_icon"></Typography>
                        {datas?.pool[0]?.startTime ? (
                          <>
                            Active (Starts in{" "}
                            {moment.unix(datas?.pool[0]?.startTime).fromNow()})
                          </>
                        ) : (
                          "Not Started yet"
                        )}
                      </IconButton>
                    </CardActions>
        </Typography>
        </>
         ): null}

        <CardActions>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ color: "#47DDFC" }}
          >
            <HiChevronDoubleDown />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ paddingLeft: "10px", paddingRight: "10px" }}
          >
           {!mention ? (
            <>
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
                <Icon icon="arcticons:rewards" /> Reward
              </IconButton>

              <IconButton
                className="iconBtn"
                sx={{ fontSize: "12px", gap: "5px" }}
                aria-label="share"
              >
                0.025 (SOL)
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
                <Icon icon="bi:clock-history" /> Claimed Rewards
              </IconButton>

              <IconButton
                className="iconBtn"
                sx={{ fontSize: "12px", gap: "5px" }}
                aria-label="share"
              >
                20 (SOL)
              </IconButton>
            </CardActions>

            <CardActions
              sx={{
                justifyContent: "space-between",

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
                <Icon icon="charm:at-sign" /> Total Mentions
              </IconButton>

              <IconButton
                className="iconBtn"
                sx={{ fontSize: "12px", gap: "5px" }}
                aria-label="share"
              >
                155
              </IconButton>
            </CardActions>
            </>
           ): null}

            {currentUserr && (
                  <UserMentions currentUser={currentUserr} data={dataa} />
                )}
          </Typography>
          
        </Collapse>
        {!mention ? (
          <CardActions
            sx={{
              justifyContent: "space-between",
              background: "#636363",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              color: "white",
            }}
            disableSpacing
          >
            <IconButton className="iconBtn" aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton className="iconBtn" aria-label="share">
              <Icon icon="ant-design:retweet-outlined" />
            </IconButton>
            <IconButton className="iconBtn" aria-label="share">
              <Icon icon="fa-regular:comment-dots" />
            </IconButton>
            <IconButton className="iconBtn" aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        ): null

        }
      </Card>
         
        {/* </div> */}
{/* ================================================ */}

 {/* <Card
            sx={{
              minHeight: "570px",
              width: "100%",
              color: "white",
              background: "#333333",
            }}
          >
            <CardHeader
              className="card_header"
              sx={{ marginLeft: "50px", marginTop: "30px", color: "white" }}
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
             
              title={datas?.projectName}
              subheader={`@${datas?.projectTwitterUsername}`}
            />

            {!mention ? (
              <Typography
                variant="body2"
                color="white"
                sx={{
                  textAlign: "center",
                  background: "#545454",
                  margin: "20px",
                  borderRadius: "10px",
                  padding: "10px 0px 0 0px",
                }}
              >
                <Typography sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    className="magic_eden"
                    variant="h5"
                    sx={{ fontSize: "19.4351px", justifyContent: "end" }}
                  >
                    Magic Eden
                  </Typography>
                </Typography>
                <Typography
                  className="magic_eden_desc"
                  sx={{ fontSize: "13.6045px", padding: "10px" }}
                >
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the.
                </Typography>

                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    background: "#636363",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                    color: "white",
                  }}
                  disableSpacing
                >
                  <IconButton className="iconBtn" aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton className="iconBtn" aria-label="share">
                    <Icon icon="ant-design:retweet-outlined" />
                  </IconButton>
                  <IconButton className="iconBtn" aria-label="share">
                    <Icon icon="fa-regular:comment-dots" />
                  </IconButton>
                  <IconButton className="iconBtn" aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Typography>
            ) : null}

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {!mention ? (
                  <>
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
                        <Icon icon="bi:clock-history" /> Date
                      </IconButton>

                      <IconButton
                        className="iconBtn"
                        sx={{ fontSize: "12px", gap: "5px" }}
                        aria-label="share"
                      >
                        <Typography className="active_icon"></Typography>
                        {datas?.pool[0]?.startTime ? (
                          <>
                            Active (Starts in{" "}
                            {moment.unix(datas?.pool[0]?.startTime).fromNow()})
                          </>
                        ) : (
                          "Not Started yet"
                        )}
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
                        <Icon icon="arcticons:rewards" /> Reward
                      </IconButton>

                      <IconButton
                        className="iconBtn"
                        sx={{ fontSize: "12px", gap: "5px" }}
                        aria-label="share"
                      >
                        0.025 (SOL)
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
                        <Icon icon="bi:clock-history" /> Claimed Rewards
                      </IconButton>

                      <IconButton
                        className="iconBtn"
                        sx={{ fontSize: "12px", gap: "5px" }}
                        aria-label="share"
                      >
                        20 (SOL)
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
                        <Icon icon="charm:at-sign" /> Total Mentions
                      </IconButton>

                      <IconButton
                        className="iconBtn"
                        sx={{ fontSize: "12px", gap: "5px" }}
                        aria-label="share"
                      >
                        155
                      </IconButton>
                    </CardActions>
                  </>
                ) : null}
                {currentUserr && (
                  <UserMentions currentUser={currentUserr} data={dataa} />
                )}
                {currentUserr ? (
                  ""
                ) : (
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "15px",
                      paddingBottom: "15px",
                      borderBottom: "1px solid gray",
                    }}
                  >
                    <Button
                      className="raid_btn"
                      sx={{ paddingLeft: "70px", paddingRight: "70px" }}
                      variant="contained"
                    >
                      Raid
                    </Button>
                  </Typography>
                )}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: "center",
                position: "absolute",
                bottom: "6%",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              disableSpacing
            >
              <IconButton aria-label="add to favorites">
                <Icon color="white" icon="akar-icons:twitter-fill" />
              </IconButton>
              <IconButton aria-label="share">
                <Icon color="white" icon="akar-icons:discord-fill" />
              </IconButton>
            </CardActions>
          </Card> */}




{/* ================================================= */}

      </Grid>
    </>
  );
};

export default MentionProjects;
