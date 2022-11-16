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
import Reply from "./Reply";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";
import "../App.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  bgcolor: "#333333",
  border: "2px solid #333333",
  borderRadius: "30px",
  boxShadow: 24,
  p: 1,
  overflowX: "hidden",
  overflowY: "scroll",
  maxHeight: "90vh",
};

export default function ThreadModal({
  allReplyOfATweet,
  data,
  openModal,
  handleModal,
  handleReplyData,
  handleIsReply,
}) {
  const [open, setOpen] = React.useState();
  const [replyData, setReplyData] = React.useState();
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  React.useEffect(() => {
    if (open === false) {
      handleModal(false);
    }
  }, [open]);

  const handleReplySubmit = (e) => {
    if (!replyData) {
      alert("empty tweet not allowed");
      return;
    }
    handleReplyData(replyData);
    handleIsReply(true);
    setReplyData("");
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="flexcroll">
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: "40px",
              paddingLeft: "40px",
              py: 2,
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              {/* <Typography sx={{ color: "white" }}>
                {" "}
                <ArrowBackIcon />{" "}
              </Typography> */}
              <Typography sx={{ fontSize: "22px", color: "white", px: 2 }}>
                {" "}
                Thread{" "}
              </Typography>
            </Typography>

            {/* <Typography
              size="small"
              sx={{
                background: "#545454",
                boxShadow: "0px 0px 4px 3px rgba(71, 221, 252, 0.3)",
                width: "30px !important",
              }}
              aria-label="add"
            >
              <CloseIcon sx={{ color: "white" }} />
            </Typography> */}
          </Typography>

          <Typography
            variant="body2"
            color="white"
            sx={{
              margin: "20px",
              background: "#222222",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              padding: "0px",
            }}
          >
            <Typography
              sx={{
                padding: "20px",
              }}
            >
              <Typography
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

                  // avatar={

                  // }
                  // title="Sarah Parker"
                  // subheader="@saraparker079"
                >
                  {" "}
                  <Avatar
                    sx={{
                      bgcolor: red[500],
                      height: "63.37px",
                      width: "63.37px",
                    }}
                    aria-label="recipe"
                  >
                    R
                  </Avatar>
                  <Typography sx={{ px: 1 }}>
                    {/* <Typography sx={{ fontSize: "24px" }}>
                      {" "}
                      Nouman Azeem{" "}
                    </Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      @nouman azeem
                    </Typography> */}
                  </Typography>
                </Typography>
                <Fab
                  size="small"
                  sx={{ background: "#545454", color: "white" }}
                  aria-label="add"
                >
                  <MoreHorizIcon />
                </Fab>
              </Typography>
              {data?.tweetText}
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <Typography sx={{ color: "#A3A3A3", fontSize: "14px" }}>
                  2.39 PM.
                </Typography>
                <Typography sx={{ color: "#47DDFC", fontSize: "14px" }}>
                  August 24.
                </Typography>
                <Typography sx={{ color: "#A3A3A3", fontSize: "14px" }}>
                  Twitter Web App
                </Typography>
              </Typography>
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ color: "#A3A3A3", fontSize: "14px", display: "flex" }}
                >
                  <Typography
                    sx={{ color: "#47DDFC", fontSize: "14px", px: 1 }}
                  >
                    4447
                  </Typography>
                  <Typography sx={{ color: "#A3A3A3", fontSize: "14px" }}>
                    Retweet,
                  </Typography>
                </Typography>
                <Typography
                  sx={{ color: "#A3A3A3", fontSize: "14px", display: "flex" }}
                >
                  <Typography
                    sx={{ color: "#47DDFC", fontSize: "14px", px: 1 }}
                  >
                    4447
                  </Typography>
                  <Typography sx={{ color: "#A3A3A3", fontSize: "14px" }}>
                    Quote Tweets,
                  </Typography>
                </Typography>
                <Typography
                  sx={{ color: "#A3A3A3", fontSize: "14px", display: "flex" }}
                >
                  <Typography
                    sx={{ color: "#47DDFC", fontSize: "14px", px: 1 }}
                  >
                    4447
                  </Typography>
                  <Typography sx={{ color: "#A3A3A3", fontSize: "14px" }}>
                    {" "}
                    Likes,
                  </Typography>
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
                <Icon color="white" icon="ant-design:heart-filled" />
              </IconButton>
              <IconButton aria-label="share">
                <Icon color="white" icon="ant-design:retweet-outlined" />
              </IconButton>
              <IconButton aria-label="share">
                <Icon color="white" icon="fa-regular:comment-dots" />
              </IconButton>
              <IconButton aria-label="share">
                <Icon color="white" icon="ci:share" />
              </IconButton>
            </Typography>
          </Typography>
          {/* ///////////////////////// */}
          <Typography
            variant="body2"
            color="white"
            sx={{
              margin: "20px",
              background: "#222222",
              borderRadius: "20px",
              boxShadow: "0px 10px 15px rgba(71, 221, 252, 0.12)",
              border: "2px solid #4F4F4F",
              padding: "0px",
            }}
          >
            <Typography
              sx={{
                padding: "20px",
              }}
            >
              <Typography
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
                    marginBottom: "0px",
                  }}

                  // avatar={

                  // }
                  // title="Sarah Parker"
                  // subheader="@saraparker079"
                >
                  <Avatar
                    sx={{
                      bgcolor: red[500],
                      height: "63.37px",
                      width: "63.37px",
                    }}
                    aria-label="recipe"
                  >
                    R
                  </Avatar>
                  <Typography sx={{ px: 2 }}>
                    <InputBase
                      sx={{ ml: 1, flex: 1, color: "white" }}
                      placeholder="Tweet Your Reply..."
                      inputProps={{ "aria-label": "search google maps" }}
                      value={replyData}
                      onChange={(e) => setReplyData(e.target.value)}
                    />
                  </Typography>
                </Typography>
                <Button
                  sx={{
                    background: "#00ACEE",
                    borderRadius: "40px",
                    color: "white",
                    px: 2,
                  }}
                  onClick={handleReplySubmit}
                >
                  Reply
                </Button>
              </Typography>
            </Typography>
          </Typography>
          {allReplyOfATweet?.map((reply) => (
            <Reply reply={reply} />
          ))}
        </Box>
      </Modal>
    </div>
  );
}
