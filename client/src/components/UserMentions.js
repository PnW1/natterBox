import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useStatesFunc from "../hooks/useStatesFunc";
import { useWallet } from "@solana/wallet-adapter-react";
import Button from "@mui/material/Button";
import { web3 } from "@project-serum/anchor";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

const UserMentions = ({ currentUser, data }) => {
  const [{ token }] = useStatesFunc();

  const [getClientMentions, setGetClientMentions] = useState();
  const { publicKey } = useWallet();
  const [projectName, setProjectName] = useState(data.projectName);
  const [mentionUserTweet, setMentionUserTweet] = useState([""]);
  const [rewardToken, setRewardToken] = useState("");
  const [userCreatedTweets, setUserCreatedTweets] = useState("");
  const [tweetTextForTweetCreation, setTweetTextForTweetCreation] =
    useState("");
  const [tweetForReward, setTweetForReward] = useState("");
  useEffect(() => {
    if (data) {
      setProjectName(data.projectName);
    }
  }, [data]);
  const solConnection = new web3.Connection(
    "https://lingering-hidden-dew.solana-mainnet.quiknode.pro/03680929d6c8fef9bb62ca0130a2df2d6303f2a0/",
    "processed"
  );

  const checkWalletNfts = async () => {
    const allNFTs = await Metadata?.findDataByOwner(solConnection, publicKey);
    return allNFTs;
  };
  const createTweet = async () => {
    try {
      if (tweetForReward === "" || rewardToken === "") {
        toast.error("Please select tweet and reward token");
        return;
      }
      let tweetId = tweetForReward;
      if (publicKey) {
        const body = {
          rewardToken,
          tweetId,
          projectName,
          projectCreator: data?.invoiceCreater?._id,
          tweetText: tweetTextForTweetCreation,
        };

        const response = await axios.patch(
          `${process.env.REACT_APP_SERVERURL}/tweet/mentionClaim/${tweetId}`,
          body,
          {
            headers: {
              Authorization: `BEARER ${currentUser.token}`,
            },
          }
        );
        if (response.data.data) {
          toast.success(response.data.msg);
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (e) {
      console.log(e);
      alert("Something went wrong");
    }
  };
  const checkClientMentionByOthers = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/tweet/getUserMentions/${data?.projectTwitterUsername}`,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
    setGetClientMentions(res.data);
  };

  const getMentionUserTweet = async () => {
    var tempArray = [];
    getClientMentions?.data?.map((tweet) => {
      let isTweetCreated = userCreatedTweets.some(
        (item) => item.tweetId === tweet.id
      );
      if (tweet?.author_id === currentUser?.id && !isTweetCreated) {
        tempArray.push(tweet);
      }
    });
    setMentionUserTweet(tempArray);
  };

  useEffect(() => {
    if (getClientMentions) {
      getMentionUserTweet();
    }
  }, [getClientMentions]);

  useEffect(() => {
    var tempArray = [];

    currentUser?.rewardStatus?.map((status) => {
      if (projectName === status.projectName) {
        tempArray.push(status);
      }
    });
    setUserCreatedTweets(tempArray);
    // setTweetForReward(tempArray[0]?.tweetId);
  }, [currentUser, projectName]);

  useEffect(() => {
    if (data?.projectTwitterUsername) {
      checkClientMentionByOthers();
    }
  }, [data?.projectTwitterUsername]);

  useEffect(() => {
    if (tweetForReward) {
      mentionUserTweet.map((tweet) => {
        if (tweet.id === tweetForReward) {
          setTweetTextForTweetCreation(tweet?.text);
        }
      });
    }
  }, [tweetForReward]);
  return (
    <>
      <div className="mb-3">
        <label
          className="form-label"
          htmlFor="userType"
          style={{ color: "white" }}
        >
          Reward Token
        </label>
        {data?.pool ? (
          <select
            className="form-select"
            id="splToken"
            required={true}
            value={rewardToken}
            onChange={(e) => {
              setRewardToken(e.target.value);
            }}
          >
            {!rewardToken ? <option value={""}>{"Select Token"}</option> : null}
            {data?.pool?.map((pool, i) => (
              <>
                <option
                  key={i}
                  style={{ fontSize: "12px", fontSize: "8px" }}
                  value={pool.splToken}
                >
                  {pool.splToken}
                </option>
              </>
            ))}
          </select>
        ) : null}
      </div>
      {mentionUserTweet?.length > 0 ? (
        <div className="mb-3">
          <label
            className="form-label"
            htmlFor="userType"
            style={{ color: "white" }}
          >
            Select Your Tweet For Reward
          </label>
          <select
            className="form-select"
            id="splToken"
            required={true}
            // defaultValue={mentionUserTweet[0]?.id}
            value={tweetForReward}
            onChange={(e) => {
              setTweetForReward(e.target.value);
            }}
          >
            {!tweetForReward ? (
              <option value={""}>{"Select Tweet"}</option>
            ) : null}
            {mentionUserTweet.map((tweet, i) => (
              <>
                <option key={i} value={tweet.id}>
                  {tweet.text}
                </option>
              </>
            ))}
          </select>
        </div>
      ) : null}
      {mentionUserTweet?.length > 0 ? (
        <Button
          id="headings"
          style={{ marginBottom: "20px" }}
          variant="contained"
          onClick={createTweet}
        >
          Apply Claim
        </Button>
      ) : null}
    </>
  );
};
export default UserMentions;
