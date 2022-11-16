import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import { Divider, Grid } from "@mui/material";
import { minHeight } from "@mui/system";
export default function RewardCards() {
  const array = [
    {
      title: "Solana Wallet",
      src: "solana.png",
      btnText: "Select Solana Wallet",
    },
    {
      title: "Ethereum Wallet",
      src: "ethereum.png",
      btnText: "Select Ethereum Wallet",
    },
    { title: "Twitter Account", src: "twitter.png", btnText: "Connect Your Tweeter" },
  ];

  return (
    <>
      <Grid
        className="justify-content-xl-center"
        container
        sx={{ width: "100%", marginBottom: "10px", marginTop: "5px" }}
      >
        {array.map((item, i) => {
          return (
            <Grid key={i} item xs={11} md={6} xl={4} padding="5px" sx={{margin:"0 auto"}}>
              <Card className="rewards_card" sx={{ width: "100%" }}>
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
                      gap: "10px",
                    }}
                    component="div"
                  >
                    {i === 0 && (
                      <img
                        width={"40px"}
                        height={"40px"}
                        src={item.src}
                        alt="solana"
                      />
                    )}
                    {i === 1 && (
                      <img width={"30px"} src={item.src} alt="solana" />
                    )}
                    {i === 2 && (
                      <img width={"45px"} src={item.src} alt="solana" />
                    )}
                    <Typography
                      gutterBottom
                      variant="h6"
                      marginTop="10px"
                      color="white"
                      component="div"
                      sx={{fontWeight:"600"}}
                    >
                      {item.title}
                    </Typography>
                  </Typography>

                  {i===0? 
                    <Typography className="profile_dashboard_wallet_btns" sx={{ color: "white" }}>
                    0.050  <sub className="btn_sub">SOL</sub> <br />
                    <span
                    className="btn_inner_percentage"
                      sx={{
                        fontSize: "10.9755px",
                        
                      }}
                    >
                      12.2% 
                    </span>
                  </Typography>: i===1? 
                  <Typography className="profile_dashboard_wallet_btns" sx={{ color: "white" }}>
                    0.050 <sub className="btn_sub">ETH</sub>  <br />
                    <span
                    className="btn_inner_percentage"
                      sx={{
                        fontSize: "10.9755px",
                        
                      }}
                    >
                      12.2% 
                    </span>
                  </Typography>: null
                  }
                </Typography>

                <CardContent></CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    sx={{
                      background:
                       `${i===0?  'linear-gradient(95.18deg, #55EEFF 25.5%, #A431D0 108%)': i===1? 'linear-gradient(93.94deg, rgba(75, 60, 189, 0.22) 9.62%, rgba(82, 68, 195, 0.33) 100%)': 'linear-gradient(180deg, rgba(28, 28, 28, 0.47) 0%, rgba(74, 75, 75, 0.58) 100%)' }`,
                      borderRadius: "38.1004px",
                      color: "white",
                      fontSize: "13px",
                      fontFamily:"Poppins",
                      gap:"5px"
                    }}
                    size="large"
                  >
                      {i === 0 && (
                      <img
                      
                        width={"25px"}
                        height={"25px"}
                        src={item.src}
                        alt="solana"
                      />
                    )}
                    {i === 1 && (
                      <img width={"15px"} src={item.src} alt="solana" />
                    )}
                    {i === 2 && (
                      <img width={"33px"} src={item.src} alt="solana" />
                    )}
                   <span> {item.btnText}</span>
                  </Button>
                  <Typography color="white" className="edit-icon">
                    <Icon icon="ant-design:edit-outlined" />
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
