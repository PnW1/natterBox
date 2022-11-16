import React, { useEffect, useState } from "react";
import axios from "axios";
import { useWallet } from "@solana/wallet-adapter-react";
import Tweet from "./Tweet";
import { Grid } from "@mui/material";

// ====================

const Pool = ({ currentUser, pool, projectDetail }) => {
  const { wallet, connect, sendTransaction, connecting, publicKey } =
    useWallet();

  if (publicKey && currentUser) {
    return (
      <>
        {pool?.tweets &&
          pool?.tweets.map((data, i) => (
            <Tweet
              key={i}
              data={data}
              currentUser={currentUser}
              projectDetail={projectDetail}
              poolData={{
                splToken: pool?.splToken,
                rewardCategory: pool?.category,
                startTime: pool.startTime,
                endTime: pool?.endTime || pool[" endTime"],
              }}
            />
          ))}
      </>
    );
  }
};
export default Pool;
