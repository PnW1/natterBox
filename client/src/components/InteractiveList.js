import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <Typography sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Demo
              sx={{
                backgroundColor: "#2C2C2E",
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                  padding: "20px",
                }}
              >
                <Typography>Top Raiders</Typography>
                <Typography>Nouman</Typography>
              </Typography>

              <List dense={dense}>
                <ListItem
                  secondaryAction={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="#47DDFC"
                      >
                        +250
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{/* <FolderIcon /> */}R</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="white"
                        >
                          @Alex,
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="white"
                        >
                          @Alex,
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
              <List dense={dense}>
                <ListItem
                  secondaryAction={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="#47DDFC"
                      >
                        +250
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{/* <FolderIcon /> */}R</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="white"
                        >
                          @Alex,
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="white"
                        >
                          @Alex,
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
              <List dense={dense}>
                <ListItem
                  secondaryAction={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="#47DDFC"
                      >
                        +250
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>{/* <FolderIcon /> */}R</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="white"
                        >
                          @Alex,
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="white"
                        >
                          @Alex,
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Demo>
          </Grid>
        </Grid>
      </Box>
    </Typography>
  );
}
