import React from 'react'

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Grid from "@mui/material/Grid";
import { Icon } from "@iconify/react";
import Button from "@mui/material/Button";

import Tweets from "./Tweets";
const TweetsCard = ({renderCards}) => {
  return (
    
     <Grid item xs={12} md={6} lg={4} sx={{ position: "relative" }}>
        <div className="penta gon">
        
            <Card sx={{ width: "100%", color: "white", background: "#333333" }}>
            <CardHeader
              className="card_header"
              sx={{ marginLeft: "50px", marginTop: "30px", color: "white" }}
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
            //   action={
            //     <IconButton aria-label="settings">
            //       <MoreVertIcon />
            //     </IconButton>
            //   }
              title={renderCards.projectName}
              subheader={`@${renderCards.projectTwitterUsername}`}
            />

            {/* <Typography
              variant="body2"
              color="white"
              sx={{
                textAlign: "center",
                background: "#545454",
                margin: "20px",
                borderRadius: "10px",
                padding: "10px 0px 0 0px",
                marginTop:"100px"
              }}
            >
              <Typography sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  className="magic_eden"
                  variant="h5"
                  sx={{ fontSize: "19.4351px", justifyContent: "end" }}
                >
                  
                 <Typography> {renderCards.projectName}</Typography>
                  {renderCards.projectTwitterUsername}
                  
                </Typography>
              </Typography>
              <Typography
                className="magic_eden_desc"
                sx={{ fontSize: "13.6045px", padding: "10px" }}
              >
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests.
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
            </Typography> */}

            <CardContent>
              <Typography variant="body2" color="text.secondary">
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
                      {renderCards.invoiceDate}
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
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }} disableSpacing>
              <IconButton aria-label="add to favorites">
                <Icon color="white" icon="akar-icons:twitter-fill" />
              </IconButton>
              <IconButton aria-label="share">
                <Icon color="white" icon="akar-icons:discord-fill" />
              </IconButton>
            </CardActions>
          </Card>

           
         
        </div>
        <div className="triangle" style={{ background: "#9c4eff" }}>
          <img className="mail_logo" src="Group.png" alt="" />
        </div>
      </Grid>
      
  
  )
}

export default TweetsCard
