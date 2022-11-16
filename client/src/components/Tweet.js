import React, { useEffect, useState } from "react";
import axios from "axios";
// import moment from "moment";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import { toast } from "react-toastify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import Images from "../assets/Images";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import useStatesFunc from "../hooks/useStatesFunc";
import { HiChevronDoubleDown } from "react-icons/hi";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  useWalletModal,
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import * as solanaWeb3 from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { web3 } from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  NATIVE_MINT,
} from "@solana/spl-token";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  Keypair,
} from "@solana/web3.js";
import IDL from "./twitter_program_for_raid.json";

// -----table imports ---------
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Icon } from "@iconify/react";
// <<<<<<< HEAD
import ThreadModal from "./ThreadModal";

// =======
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
const moment = require("moment");

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
// ====================

const Tweet = ({ currentUser, data, projectDetail, poolData }) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [{ token, loading }] = useStatesFunc();

  const [getTweetLikes, setGetTweetLikes] = useState();
  const [retweetStatus, setRetweetStatus] = useState();
  const [quoteTweets, setQuoteTweets] = useState();
  const [isTweetLike, setIsTweetLike] = useState();
  const [isTweetReplied, setIsTweetReplied] = useState();
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [projectName, setProjectName] = useState();
  const [isTweetRetweeted, setIsTweetRetweeted] = useState();
  const [allReplyOfATweet, setAllReplyOfATweet] = useState();
  const [currentUserFallowers, setCurrentUserFallowers] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [updateReplyFlag, setUpdateReplyFlag] = useState();
  const [rewards, setreward] = useState();
  const [tweetsStatus, settweetStatus] = useState();
  const { wallet, connect, sendTransaction, connecting, publicKey } =
    useWallet();

  const solConnection = new web3.Connection(
    "https://lingering-hidden-dew.solana-mainnet.quiknode.pro/03680929d6c8fef9bb62ca0130a2df2d6303f2a0/",
    "processed"
  );
  let cloneWindow = window;
  let provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );
  const program = new anchor.Program(
    IDL,
    "5UR1VYhWxH9iy5C7mdQWDztgDHLeGZoSyEjye4vzHcjs",
    provider
  );
  const getCurrentUserFollower = async () => {
    if (!currentUser?.id) {
      toast.error("Please sigin first");
      return;
    }
    const res = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/tweet/getUserFollowers/${currentUser?.id}`,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
    setCurrentUserFallowers(res?.data?.data?.length);
  };

  useEffect(() => {
    if (currentUser?.id) {
      getCurrentUserFollower();
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (projectDetail) {
      setProjectName(projectDetail.projectName);
    }
  }, [projectDetail]);

  const handleModal = (data) => {
    setOpenModal(data);
  };

  const handleReplyData = async (data) => {
    await replyToSpecificTweet(data);
    setUpdateReplyFlag(!updateReplyFlag);
  };

  const handleIsReply = async (data) => {
    setIsTweetReplied(data);
  };

  // <<<<<<< HEAD
  // ==========for table =========
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein, proteins) {
    return { name, calories, fat, carbs, protein, proteins };
  }
  const rows = [
    createData(
      <a href={data?.tweetUrl}>{data?.tweetText}</a>,
      <Icon
        className="check_icon"
        id="check_icon"
        icon="akar-icons:check-box"
      />,
      <Icon className="check_icon" icon="akar-icons:check-box" />,
      <Icon className="check_icon" icon="akar-icons:check-box" />,
      <Icon className="check_icon" icon="akar-icons:check-box" />,
      <Icon className="check_icon" icon="akar-icons:check-box" />,
      <Icon className="check_icon" icon="akar-icons:check-box" />,
      <Icon className="check_icon" icon="akar-icons:check-box" />
    ),
  ];

  const checkTweetLiked = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/tweet/getTweetliked/${data?.tweetId}`,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
    setGetTweetLikes(res.data.data);
  };

  useEffect(() => {
    var isTweetLiked = false;
    if (data?.tweetId) {
      currentUser?.raidStatus?.likeStatus?.map((tweetStatus) => {
        if (tweetStatus.tweetId === data?.tweetId) {
          setIsTweetLike(true);
          isTweetLiked = true;
        }
      });
    }
    if (!isTweetLiked) {
      var tweetLikeStatus = false;
      if (getTweetLikes) {
        getTweetLikes.map((tweet) => {
          if (tweet?.username === currentUser.userName) {
            tweetLikeStatus = true;
          }
        });
        if (tweetLikeStatus) {
          setIsTweetLike(true);
        } else {
          setIsTweetLike(false);
        }
      }
    }
  }, [getTweetLikes, currentUser, data?.tweetId]);

  const checkTweetRetweet = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/tweet/getRetweets/${data?.tweetId}`,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
    setRetweetStatus(res?.data?.data);
  };

  useEffect(() => {
    var tweetIsRetweeted = false;
    if (data?.tweetId) {
      currentUser?.raidStatus?.retweetStatus?.map((tweetStatus) => {
        if (tweetStatus?.tweetId === data?.tweetId) {
          setIsTweetRetweeted(true);
          settweetStatus(tweetStatus?.rewardAmount);

          tweetIsRetweeted = true;
        }
      });
    }
    if (!tweetIsRetweeted) {
      var tweetRetweetStatus = false;
      if (retweetStatus) {
        retweetStatus?.map((status) => {
          if (status?.username === currentUser.userName) {
            tweetRetweetStatus = true;
          }
        });
        if (tweetRetweetStatus) {
          setIsTweetRetweeted(true);
        } else {
          setIsTweetRetweeted(false);
        }
      }
    }
  }, [retweetStatus, currentUser, data?.tweetId]);

  useEffect(() => {
    if (data?.tweetId) {
      checkTweetLiked();
      checkTweetRetweet();
    }
  }, [data?.tweetId, currentUser]);

  useEffect(() => {
    if (currentUser && publicKey) {
      let data = {
        twitterId: currentUser.id,
        publicKey: publicKey.toString(),
      };
      axios
        .patch(
          `${process.env.REACT_APP_SERVERURL}/api/addUserWalletPublicKey`,
          data
        )
        .then((response) => console.log(response, "responseresponse"));
    }
  }, [publicKey, currentUser]);

  const checkUserNumberOfFollower = async () => {
    if (!currentUser) {
      toast.error("Please sigin first");
      return;
    }
    const res = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/tweet/getUserFollowers/${currentUser.id}`,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
    toast.success(res.data.data.length);
  };

  const checkQuoteTweets = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/tweet/getQuotedTweetsByTweetId/${data?.tweetId}`,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
    if (res?.data?.data) {
      return res?.data.data;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (poolData?.endTime * 1000 < Date.now()) {
      setIsEnded(true);
    } else {
      setIsEnded(false);
    }
    if (poolData?.startTime * 1000 < Date.now()) {
      setIsStarted(true);
    } else {
      setIsStarted(false);
    }
  }, [poolData]);

  const LikeTweet = async (number) => {
    var reward = 0;

    if (currentUserFallowers >= 2 && currentUserFallowers <= 99) {
      reward = poolData.rewardCategory[0];
    } else if (currentUserFallowers >= 100 && currentUserFallowers <= 299) {
      reward = poolData.rewardCategory[1];
    } else if (currentUserFallowers >= 300 && currentUserFallowers <= 499) {
      reward = poolData.rewardCategory[2];
    } else if (currentUserFallowers >= 500 && currentUserFallowers <= 999) {
      reward = poolData.rewardCategory[3];
    } else if (currentUserFallowers >= 1000 && currentUserFallowers <= 4999) {
      reward = poolData.rewardCategory[4];
    } else if (currentUserFallowers >= 5000 && currentUserFallowers <= 9999) {
      reward = poolData.rewardCategory[5];
    } else if (currentUserFallowers >= 10000) {
      reward = poolData.rewardCategory[6];
    }

    reward = reward * 1000000000;
    if (reward) {
      setreward(reward);
    }
    console.log(publicKey);
    if (!publicKey) {
      toast.error("PublicKey not found");
      return;
    }
    const mintAddress = NATIVE_MINT;
    const clientAddress = new PublicKey(projectDetail?.invoiceCreaterPublicKey);

    const id = parseInt(Math.random() * 250);
    const id2 = parseInt(Math.random() * 250);
    const tweetId = data?.tweetId;
    if (publicKey) {
      let seed = `like-${tweetId}`;
      if (number === 1) {
        seed = `like-${tweetId}`;
      }
      if (number === 2) {
        seed = `retweet-${tweetId}`;
      }
      if (number === 3) {
        seed = `comment-${tweetId}`;
      }
      // let userForLikeAddress = anchor.web3.Keypair.generate();
      const userForLikeAddress = await PublicKey.createWithSeed(
        clientAddress,
        seed,
        program.programId
      );
      console.log(userForLikeAddress.toString(), "usersforlike");
      const [tweetAta, bump] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("tweets"),
          // provider.wallet.publicKey.toBuffer(),
          Buffer.from(tweetId),
          Buffer.from(projectName),
        ],
        program.programId
      );

      const [poolAddress] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("pool"),
          clientAddress.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
        ],
        program.programId
      );

      const [poolAta] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("poolAta"),
          clientAddress.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
        ],
        program.programId
      );

      const [globalAuth, globalBump] =
        await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from("global-authority")],
          // new anchor.BN(id).toArrayLike(Buffer)],
          program.programId
        );
      const prizeTokenAccount = await solConnection.getTokenAccountsByOwner(
        provider.wallet.publicKey,
        { mint: mintAddress }
      );

      // console.log(prizeTokenAccount.value[0].pubkey.toString())

      let userAta = (
        await PublicKey.findProgramAddress(
          [
            provider.wallet.publicKey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintAddress.toBuffer(), // mint address
          ],
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      )[0];

      console.log(userAta.toString(), "associatedTokenAccountPubkey");
      console.log(tweetAta.toString(), bump, "tweetAta");
      console.log(poolAddress.toString(), "poolAddress");
      console.log(poolAta.toString(), "poolAta");
      console.log(
        await solConnection.getMinimumBalanceForRentExemption(336),
        "lamports"
      );
      const userAtaCheck = await solConnection.getTokenAccountsByOwner(
        provider.wallet.publicKey,
        { mint: mintAddress }
      );
      let instructions = [];
      if (userAtaCheck.value.length === 0) {
        console.log("2nd condition");
        instructions.push(
          Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintAddress,
            userAta,
            provider.wallet.publicKey,
            provider.wallet.publicKey
          )
        );
      }

      if (number === 1) {
        const tx = await program.rpc.likeTweet(
          globalBump,
          projectName,
          tweetId,
          new anchor.BN(reward),
          {
            accounts: {
              user: provider.wallet.publicKey,
              client: clientAddress,
              // tweetData: tweetAta,
              globalAuthority: globalAuth,
              // pool: poolAddress,
              usersForLike: userForLikeAddress,
              poolAta: poolAta,
              userAta: userAta,
              poolMint: mintAddress,
              // poolMint: new PublicKey("So11111111111111111111111111111111111111112"),
              // systemProgram: SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
              // rent: SYSVAR_RENT_PUBKEY,
            },
            instructions,
          }
        );
        console.log(tx, "tx");
        return tx;
      }
      if (number === 2) {
        const tx = await program.rpc.retweet(
          globalBump,
          projectName,
          tweetId,
          new anchor.BN(reward),
          {
            accounts: {
              user: provider.wallet.publicKey,
              client: clientAddress,
              // tweetData: tweetAta,
              globalAuthority: globalAuth,
              // pool: poolAddress,
              usersForRetweet: userForLikeAddress,
              poolAta: poolAta,
              userAta: userAta,
              poolMint: mintAddress,
              // poolMint: new PublicKey("So11111111111111111111111111111111111111112"),
              // systemProgram: SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
              // rent: SYSVAR_RENT_PUBKEY,
            },
            instructions,
          }
        );
        console.log(tx, "tx");
        return tx;
      }
      if (number === 3) {
        const tx = await program.rpc.commentTweet(
          globalBump,
          projectName,
          tweetId,
          new anchor.BN(reward),
          {
            accounts: {
              user: provider.wallet.publicKey,
              client: clientAddress,
              // tweetData: tweetAta,
              globalAuthority: globalAuth,
              // pool: poolAddress,
              usersForComment: userForLikeAddress,
              poolAta: poolAta,
              userAta: userAta,
              poolMint: mintAddress,
              // poolMint: new PublicKey("So11111111111111111111111111111111111111112"),
              // systemProgram: SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
              // rent: SYSVAR_RENT_PUBKEY,
            },
            instructions,
          }
        );
        console.log(tx, "tx");
        return tx;
      }
    } else {
      toast.error("connect wallet");
    }
  };
  const likeSpecificTweet = async () => {
    try {
      if (!data?.tweetId || !projectName) {
        toast.error("Tweet id or project name not found");
        return;
      }
      if (!isStarted) {
        toast.error("Not Started");
        return;
      }
      if (isEnded) {
        toast.error("Ended");
        return;
      }
      if (isTweetLike) {
        toast.error("Tweet is Already liked");
        return;
      }
      let body = {
        projectName,
        mintAddress: poolData?.splToken,
        projectCreator: projectDetail?.invoiceCreater?._id,
        time: moment().unix(),
      };
      const res = await axios.patch(
        `${process.env.REACT_APP_SERVERURL}/tweet/likeSpecificTweet/${data?.tweetId}`,
        body,
        {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        }
      );
      if (res?.data?.tx) {
        toast.success(res?.data?.msg);
        setIsTweetLike(true);
      } else {
        toast.error(res?.data?.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const replyToSpecificTweet = async (reply) => {
    try {
      if (!isStarted) {
        toast.error("Not Started");
        return;
      }
      if (isEnded) {
        toast.error("Ended");
        return;
      }
      if (isTweetReplied) {
        toast.error("You have already make reply for this tweet");
        return;
      }
      if (!reply) {
        toast.error("No empty reply allowed");
        return;
      }
      let body = {
        projectName,
        tweetReply: reply,
        mintAddress: poolData?.splToken,
        projectCreator: projectDetail?.invoiceCreater?._id,
        time: moment().unix(),
      };
      const res = await axios.patch(
        `${process.env.REACT_APP_SERVERURL}/tweet/replyToTweetWithTweetId/${data?.tweetId}`,
        body,
        {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        }
      );
      if (res?.data?.tx) {
        toast.success(res?.data?.msg);
      } else {
        toast.error(res?.data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.tweetId) {
      currentUser?.raidStatus?.likeStatus?.map((tweetStatus) => {
        if (tweetStatus?.tweetId === data?.tweetId) {
          setIsTweetReplied(true);
        }
      });
    }
  }, [currentUser, data?.tweetId]);

  const retweetATweet = async () => {
    try {
      if (!isStarted) {
        toast.error("Not Started");
        return;
      }
      if (isEnded) {
        toast.error("Ended");
        return;
      }
      if (isTweetRetweeted) {
        toast.error("Tweet Already retweeted");
        return;
      }
      let body = {
        projectName,
        mintAddress: poolData?.splToken,
        projectCreator: projectDetail?.invoiceCreater?._id,
        time: moment().unix(),
      };
      const res = await axios.patch(
        `${process.env.REACT_APP_SERVERURL}/tweet/retweetATweet/${data?.tweetId}`,
        body,
        {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        }
      );
      if (res?.data?.tx) {
        toast.success(res?.data?.msg);
        setIsTweetRetweeted(true);
      } else {
        toast.error(res?.data?.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const getAllReplyOfATweet = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVERURL}/tweet/getAllReplyForATweet/${data?.tweetId}`,
        {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        }
      );
      setAllReplyOfATweet(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (data?.tweetId) {
      getAllReplyOfATweet();
    }
  }, [data?.tweetId, updateReplyFlag]);

  // const checkIsUserQuoteTheTweet = async () => {
  //   let result = await checkQuoteTweets();
  //   if (result) {
  //     setQuoteTweets(result);
  //   } else {
  //     // alert("no one Quote your tweet");
  //     return;
  //   }
  // };

  useEffect(() => {
    let isUserExist = false;
    if (quoteTweets) {
      retweetStatus?.map((status) => {
        if (status?.username === currentUser.userName) {
          toast.success("you have quote the tweet");
          isUserExist = true;
        }
      });
      if (!isUserExist) {
        toast.error("you have not quote the tweet");
      }
    }
  }, [quoteTweets]);

  return (
    <>
      <Grid item xs={12} md={6} lg={4} xl={3} sx={{ position: "relative" }}>
        <Card
          sx={{
            maxWidth: 345,
            margin: "0 auto",
            background: "rgba(0, 0, 0, 0.5)",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "17px",
          }}
          className="raids_card"
        >
          <Typography
            component="div"
            sx={{
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%) ,url("${Images.raidcardImg}")`,

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
                  {/* <MoreVertIcon /> */}
                  <Typography
                    className="raids_card"
                    component="div"
                    sx={{
                      width: "67px",
                      fontSize: "17px",
                      height: "44px",
                      background: "#00ACEE",
                      borderRadius: "50px 0px 0px 50px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "-16px",
                    }}
                  >
                    + Raid
                  </Typography>
                </IconButton>
              }
              title={projectName}
              subheader={projectDetail?.projectTwitterUsername}
            />
          </Typography>

          <CardContent>
            <Typography
              variant="body2"
              color="white"
              className="raids_card"
              sx={{ textAlign: "" }}
            >
              <Typography sx={{ display: "", justifyContent: "start" }}>
                <Typography
                  className="magic_eden"
                  variant="h7"
                  sx={{ fontSize: "19.4351px", justifyContent: "start" }}
                >
                  {projectName}
                </Typography>
                <br />
                <Typography
                  className="magic_eden"
                  variant="h7"
                  sx={{ fontSize: "18px", justifyContent: "end" }}
                >
                  {projectDetail?.projectTwitterUsername}
                </Typography>
              </Typography>
              <Typography
                className="magic_eden_desc"
                sx={{ fontSize: "13.6045px", padding: "10px 10px 10px 0px" }}
              >
                {data?.tweetText}
              </Typography>
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

                {poolData?.startTime ? (
                  <>
                    {poolData?.startTime * 1000 > Date.now()
                      ? " Active will be"
                      : "Active"}
                    ( {moment.unix(poolData?.startTime).fromNow()})
                  </>
                ) : (
                  "Not Started yet"
                )}
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
                  {tweetsStatus ? tweetsStatus : ""} (SOL)
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
          </Collapse>
          <CardActions
            sx={{
              justifyContent: "space-between",
              background: "#636363",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
            disableSpacing
          >
            {!isTweetLike ? (
              <IconButton
                onClick={likeSpecificTweet}
                aria-label="add to favorites"
              >
                <Icon color="white" icon="ant-design:heart-filled" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => toast.error("You have already like the tweet")}
                aria-label="add to favorites"
              >
                <Icon
                  color="rgb(249, 24, 128)"
                  icon="ant-design:heart-filled"
                />
              </IconButton>
            )}
            {!isTweetRetweeted ? (
              <IconButton onClick={retweetATweet} aria-label="share">
                <Icon color="white" icon="ant-design:retweet-outlined" />
              </IconButton>
            ) : (
              <IconButton
                onClick={() =>
                  toast.error("You have already retweet the tweet")
                }
                aria-label="share"
              >
                <Icon
                  color="rgb(0, 186, 124)"
                  icon="ant-design:retweet-outlined"
                />
              </IconButton>
            )}
            <IconButton aria-label="share">
              <Icon
                color="white"
                onClick={() => setOpenModal(true)}
                icon="fa-regular:comment-dots"
              />
            </IconButton>
            <IconButton aria-label="share">
              <Icon color="white" icon="ci:share" />
            </IconButton>
          </CardActions>
        </Card>

        {/* ====================================================================================== */}
        {/* <Card
            sx={{
              width: "100%",
              color: "white",
              background: "#333333",
              minHeight: "570px",
            }}
          >
            <Typography
          component="div"
          sx={{
            backgroundImage: `url("${Images.raicardImg}")`,
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

            <Typography
              variant="body2"
              color="white"
              sx={{
                textAlign: "center",
                background: "#545454",
                margin: "20px",
                borderRadius: "10px",
                padding: "10px 0px 0 0px",
                marginTop: "90px",
              }}
            >
              <Typography sx={{ display: "", justifyContent: "center" }}>
                <Typography
                  className="magic_eden"
                  variant="h7"
                  sx={{ fontSize: "19.4351px", justifyContent: "end" }}
                >
                  {projectName}
                </Typography>
                <br />
                <Typography
                  className="magic_eden"
                  variant="h7"
                  sx={{ fontSize: "18px", justifyContent: "end" }}
                >
                  {projectDetail?.projectTwitterUsername}
                </Typography>
              </Typography>
              <Typography
                className="magic_eden_desc"
                sx={{ fontSize: "13.6045px", padding: "10px" }}
              >
                {data?.tweetText}
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
                {!isTweetLike ? (
                  <IconButton
                    onClick={likeSpecificTweet}
                    aria-label="add to favorites"
                  >
                    <Icon color="white" icon="ant-design:heart-filled" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() =>
                      toast.error("You have already like the tweet")
                    }
                    aria-label="add to favorites"
                  >
                    <Icon
                      color="rgb(249, 24, 128)"
                      icon="ant-design:heart-filled"
                    />
                  </IconButton>
                )}
                {!isTweetRetweeted ? (
                  <IconButton onClick={retweetATweet} aria-label="share">
                    <Icon color="white" icon="ant-design:retweet-outlined" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() =>
                      toast.error("You have already retweet the tweet")
                    }
                    aria-label="share"
                  >
                    <Icon
                      color="rgb(0, 186, 124)"
                      icon="ant-design:retweet-outlined"
                    />
                  </IconButton>
                )}
                <IconButton aria-label="share">
                  <Icon
                    color="white"
                    onClick={() => setOpenModal(true)}
                    icon="fa-regular:comment-dots"
                  />
                </IconButton>
                <IconButton aria-label="share">
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
                    <Icon icon="bi:clock-history" /> Date
                  </IconButton>

                  <IconButton
                    className="iconBtn"
                    sx={{ fontSize: "12px", gap: "5px" }}
                    aria-label="share"
                  >
                    <Typography className="active_icon"></Typography>

                    {poolData?.startTime ? (
                      <>
                        {poolData?.startTime * 1000 > Date.now()
                          ? " Active will be"
                          : "Active"}
                        ( {moment.unix(poolData?.startTime).fromNow()})
                      </>
                    ) : (
                      "Not Started yet"
                    )}
                  </IconButton>
                </CardActions>

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
                    0 (SOL)
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
                    {tweetsStatus ? tweetsStatus : ""} (SOL)
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
               

                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "15px",
                    paddingBottom: "15px",
                    borderBottom: "1px solid gray",
                  }}
                >
                 
                </Typography>
              </Typography>
              </Collapse>
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

        {/* <div className="triangle" style={{ background: "#FFA34E" }}>
          <img className="mail_logo" src="r.png" alt="" />
        </div> */}
      </Grid>

      <ThreadModal
        allReplyOfATweet={allReplyOfATweet}
        data={data}
        openModal={openModal ? openModal : false}
        handleModal={handleModal}
        handleReplyData={handleReplyData}
        handleIsReply={handleIsReply}
      />
    </>
  );
};
export default Tweet;
