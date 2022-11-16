import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Container, Grid } from "@mui/material";
import Tabledata from "../components/Tabledata";
import { Icon } from "@iconify/react";
// function CircularProgressWithLabel(props) {
//   return (
//     <Box sx={{ position: "relative", display: "inline-flex" }}>
//       <CircularProgress
//         variant="determinate"
//         {...props}
//         size="25vh"
//         sx={{
//           color: "#00ACEE",
//         }}
//       />
//       <Box
//         sx={{
//           top: 0,
//           left: 0,
//           bottom: 0,
//           right: 0,
//           position: "absolute",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Typography variant="caption" component="div" color="text.secondary">
//           {`${Math.round(props.value)}%`}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// CircularProgressWithLabel.propTypes = {

//   value: PropTypes.number.isRequired,
// };

export default function Progressbr() {
  // const [progress, setProgress] = React.useState(10);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) =>
  //       prevProgress >= 100 ? 0 : prevProgress + 10
  //     );
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  return (

    <>
    <h1 className="text-white text-center">COMING SOON...</h1>
      {/* <Typography variant="h5" className="myprofile ">
        Stats
      </Typography>

      <Container
        style={{ marginTop: "60px", marginBottom: "30px" }}
        maxWidth="md"
      >
        <Grid
          container
          // columnGap={4}
          sm={12}
          md={12}
          lg={12}
          // display="flex"
          justifyContent="space-between"
          justifyContent-lg="center"
          alignItems={"center"}
        >
          <Grid item xs={12} md={6} lg={4} sx={{ textAlign: "center" }}>
            <Typography>
              <CircularProgressWithLabel value={60} className="circleeee" />
            </Typography>
            <Typography>Tweets</Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={4} sx={{ textAlign: "center" }}>
            <Typography>
              <CircularProgressWithLabel value={75} className="circleeee" />
            </Typography>
            <Typography sx={{ textAlign: "center" }}>Tweets</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ textAlign: "center" }}>
            <Typography>
              <CircularProgressWithLabel value={100} className="circleeee" />
            </Typography>
            <Typography sx={{ textAlign: "center" }}>Tweets</Typography>
          </Grid>
        </Grid>
      </Container>

      <Typography
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        sx={{
          backgroundColor: "white",
          paddingLeft: "14px",
          paddingRight: "14px",
        }}
      >
        <Typography>
          <Typography className="tabtext">Transaction History</Typography>
        </Typography>
        <Typography component="div">
          <Button variant="contained" className="downloadbtn">
            <Icon icon="codicon:cloud-download" className="downloadicon" />
            Download
          </Button>
        </Typography>
      </Typography>
      <Tabledata /> */}

    </>
  );
}
