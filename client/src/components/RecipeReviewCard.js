import * as React from "react";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Images from "../assets/Images";
import { HiChevronDoubleDown } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";

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

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Typography sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{ maxWidth: 345, backgroundColor: "black", borderRadius: "17px" }}
      >
        <Typography
          component="div"
          sx={{
            backgroundImage: `url("${Images.banner}")`,
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
            title="Shrimp and Chorizo Paella"
            subheader="@nouman"
          />
        </Typography>
        {/* <CardMedia
          component="img"
          height="194"
          image={Images.banner}
          alt="Paella dish"
        /> */}

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
              Active (Starts in{" "}
            </IconButton>
          </CardActions>
        </Typography>

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
        </Collapse>
      </Card>
    </Typography>
  );
}
