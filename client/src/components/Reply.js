import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";

import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Avatar, Fab } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function Reply({ reply }) {
  return (
    <div>
      <Typography
        variant="body2"
        color="white"
        sx={{
          margin: "20px",
          background: "#333333",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          padding: "0px",
        }}
      >
        <Typography
          sx={{
            borderLeft: "2px solid #4F4F4F",
            borderRight: "2px solid #4F4F4F",
            borderTop: "2px solid #4F4F4F",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          }}
        >
          <Typography
            sx={{
              padding: "20px",
            }}
          >
            {/* <Typography
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}

               
              >
                {" "}
                <Avatar
                  sx={{
                    bgcolor: red[500],
                    height: "53.37px",
                    width: "53.37px",
                  }}
                  aria-label="recipe"
                >
                  R
                </Avatar>
                <Typography sx={{ px: 1 }}>
                  <Typography sx={{ fontSize: "20px" }}>
                    {" "}
                    Nouman Azeem{" "}
                  </Typography>
                  <Typography sx={{ display: "flex" }}>
                    <Typography sx={{ fontSize: "11px" }}>
                      Repling to{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: "#00ACEE",
                        marginLeft: "3px",
                      }}
                    >
                      {" "}
                      @nouman
                    </Typography>
                  </Typography>
                </Typography>
              </Typography>
              <Fab
                size="small"
                sx={{ background: "#545454", color: "white" }}
                aria-label="add"
              >
                <MoreHorizIcon />
              </Fab>
            </Typography> */}
            <Typography sx={{ paddingRight: "61px", paddingLeft: "61px" }}>
              {reply?.text}
            </Typography>
          </Typography>
        </Typography>

        <Typography
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "#1C1C1C",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
          disableSpacing
        >
          <IconButton aria-label="add to favorites">
            <Icon color="rgb(249, 24, 128)" icon="ant-design:heart-filled" />
          </IconButton>
          <IconButton aria-label="share">
            <Icon color="rgb(0, 186, 124)" icon="ant-design:retweet-outlined" />
          </IconButton>
          <IconButton aria-label="share">
            <Icon color="white" icon="fa-regular:comment-dots" />
          </IconButton>
          <IconButton aria-label="share">
            <Icon color="white" icon="ci:share" />
          </IconButton>
        </Typography>
      </Typography>
    </div>
  );
}
