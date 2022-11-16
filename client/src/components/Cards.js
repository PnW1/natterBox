import React from "react";
// import Header from '../components/Header'
import Images from "../assets/Images";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { BorderBottomRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  gridContainerItem2: {
    // marginTop: -130,
    // background: "rgb(29,29,27)",

    justifyContent: "center",
    //  [t .down("xs")]: {
    //     paddingLeft: 0,
    //     paddingRight: 0,
    //     marginTop: -100,
    //   },
  },
  //   gridContainerItem3: {
  //     display: "flex",
  //     justifyContent: "center",
  //   },
  gridItemContent: {
    color: "white",
    maxWidth: "450px",
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  //   marginCustom: {
  //     marginBottom: 20
  //   },
  //   benifitText: {
  //     // marginBottom: 20,
  //     marginTop: 0,
  //     [theme.breakpoints.down("xs")]: {
  //       marginTop: 40,
  //     },
  //   },
  cardMain: {
    width: "100%",
    backgroundColor: "transparent !important",
    boxShadow: "none !important",
    // margin: 5,
    // minHeight: 380,
  },

  cardImg: {
    width: "100%",
  },
  //   cardImgContainer: {
  //     marginTop: 0,
  //     display: "flex",
  //     justifyContent: "center",
  //   },

  //   cardBody: {
  //     display: "none",
  //     paddingBottom: 20
  //   },
}));
// });

function Cards() {
  const cardData = [
    {
      title: "SET UP YOUR REWARD PROGRAMME",
      des: "Decide on time frame and how much you would like to reward them with",
      imageSrc: Images.card1,
    },
    {
      title: "FUND YOUR WALLET",
      des: "Fund you Unique wallet with the token you would like to reward you like to supporters with",
      imageSrc: Images.card3,
    },
    {
      title: "SHARE WITH YOUR COMMUNITY",
      des: "Decide on time frame and how much you would like to reward them with",
      imageSrc: Images.card2,
    },
  ];

  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid
        id="roadmap"
        container
        item
        xs={12}
        md={12}
        lg={12}
        className={classes.gridContainerItem2}
      >
        {cardData.map((obj, id) => (
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Card className={classes.cardMain} sx={{ minWidth: 275 }}>
              <CardContent className={classes.cardContentCustom}>
                <Typography
                  sx={{ mb: 1.5 }}
                  className={classes.cardImgContainer}
                >
                  <img src={obj.imageSrc} className={classes.cardImg} />
                </Typography>
                <Typography variant="h5" component="div" className="card_title">
                  {obj.title}
                </Typography>
                <Typography variant="body2" className="card_des">
                  {obj.des}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Cards;
