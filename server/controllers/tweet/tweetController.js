const fetch = require("node-fetch");
const axios = require("axios");
const { TwitterApi } = require("twitter-api-v2");
const Invoice = require("../../model/invoiceModel");
const Reward = require("../../model/reward");
const User = require("../../model/userModel");
const Wallet = require("../../model/walletModel");
const mongoose = require("mongoose");
const { Program, web3 } = require("@project-serum/anchor");
const anchor = require("@project-serum/anchor");
const bs58 = require("bs58");
const nacl = require("tweetnacl");
const moment = require("moment");

const {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  Token,
} = require("@solana/spl-token");
const {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_RECENT_BLOCKHASHES_PUBKEY,
  Transaction,
  Keypair,
} = require("@solana/web3.js");
const fs = require("fs");
const { publicKey } = require("@project-serum/anchor/dist/cjs/utils");

const PROGRAM_ID = new anchor.web3.PublicKey(
  "HG78SnP76CMbvUsMuu8KvPPbzKuJJenryHVvCzPkMN2B"
);
const idl = JSON.parse(
  fs.readFileSync(__dirname + "/twitter_program.json", "utf8")
);

// anchor.setProvider(anchor.Provider.local(web3.clusterApiUrl("devnet")));

anchor.setProvider(
  anchor.Provider.local(
    "https://lingering-hidden-dew.solana-mainnet.quiknode.pro/03680929d6c8fef9bb62ca0130a2df2d6303f2a0/"
  )
);

// var solConnection = new web3.Connection(web3.clusterApiUrl("devnet"), {
//   commitment: "confirmed",
//   confirmTransactionInitialTimeout: 12000,
// });

var solConnection = new web3.Connection(
  "https://lingering-hidden-dew.solana-mainnet.quiknode.pro/03680929d6c8fef9bb62ca0130a2df2d6303f2a0/",
  {
    commitment: "confirmed",
    confirmTransactionInitialTimeout: 12000,
  }
);

const program = new anchor.Program(idl, PROGRAM_ID);

const getUserIdFromName = async (req, res) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    };
    fetch(
      `https://api.twitter.com/2/users/by?usernames=${req.params.username}&user.fields=username`,
      { headers }
    )
      .then((response) => response.json())
      .then((data) => {
        return res.send(data);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const getUserMentions = async (req, res) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    };

    fetch(
      `https://api.twitter.com/2/users/by?usernames=${req.params.username}&user.fields=username`,
      { headers }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data[0].id) {
          fetch(
            `https://api.twitter.com/2/users/${data.data[0].id}/mentions?expansions=author_id&user.fields=name&tweet.fields=created_at`,
            {
              headers,
            }
          )
            .then((response) => response.json())
            .then((data) => {
              return res.send(data);
            });
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};

const getUserFollowers = async (req, res) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    };

    fetch(`https://api.twitter.com/2/users/${req.params.userId}/followers`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        return res.send(data);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const getTweetById = async (req, res) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    };

    fetch(
      `https://api.twitter.com/2/tweets/${req.params.tweetId}?expansions=author_id&user.fields=name&tweet.fields=created_at`,
      {
        headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return res.send(data);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const getTweetliked = async (req, res) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    };

    fetch(
      `https://api.twitter.com/2/tweets/${req.params.tweetId}/liking_users`,
      {
        headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return res.send(data);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const getRetweets = async (req, res) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    };

    fetch(
      `https://api.twitter.com/2/tweets/${req.params.tweetId}/retweeted_by`,
      {
        headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return res.send(data);
      });
  } catch (error) {
    console.log(error.message);
  }
};

const getQuotedTweetsByTweetId = async (req, res) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    };

    fetch(
      `https://api.twitter.com/2/tweets/${req.params.tweetId}/quote_tweets?expansions=author_id&user.fields=name`,
      {
        headers,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return res.send(data);
      });
  } catch (error) {
    console.log(error.message);
  }
};
const getAllReplyForATweet = async (req, res) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    };
    // fetch(
    //   `https://api.twitter.com/2/tweets?ids=${req.params.tweetId}&tweet.fields=author_id,conversation_id,created_at,in_reply_to_user_id,referenced_tweets&expansions=author_id,in_reply_to_user_id,referenced_tweets.id&user.fields=name,username`,
    //   { headers }
    // )
    fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${req.params.tweetId}&tweet.fields=in_reply_to_user_id,author_id,created_at,conversation_id`,
      { headers }
    )
      .then((response) => response.json())
      .then((data) => {
        return res.send(data);
      });
  } catch (error) {
    console.log(error.message);
  }
};
const likeSpecificTweet = async (req, res) => {
  try {
    let { accessToken, accessTokenSecret, twitterId, id, publicKey } =
      req.userObj;
    let { projectName, mintAddress, projectCreator } = req.body;
    var splToken = mintAddress;
    var poolType = "raid";
    var usersArray = [publicKey];
    let tweetData = await Invoice.find({
      $and: [
        { invoiceCreater: mongoose.Types.ObjectId(projectCreator) },
        { projectName: projectName },
        { "pool.splToken": mintAddress },
        { "pool.tweets.tweetId": req.params.tweetId },
      ],
    });
    if (tweetData.length > 0) {
      var numberOfFollowes = 0;
      var poolCategory = [];
      var rewardAmount;
      const headers = {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      };

      let response = await axios(
        `https://api.twitter.com/2/users/${twitterId}/followers`,
        {
          headers,
        }
      );
      numberOfFollowes = response.data.meta.result_count;
      if (numberOfFollowes > 0) {
        if (tweetData[0].pool.length > 0) {
          tweetData[0].pool.map((poolData) => {
            if (poolData.splToken === mintAddress) {
              poolCategory = poolData.category;
            }
          });

          if (numberOfFollowes >= 2 && numberOfFollowes <= 99) {
            rewardAmount = poolCategory[0];
          } else if (numberOfFollowes >= 100 && numberOfFollowes <= 299) {
            rewardAmount = poolCategory[1];
          } else if (numberOfFollowes >= 300 && numberOfFollowes <= 499) {
            rewardAmount = poolCategory[2];
          } else if (numberOfFollowes >= 500 && numberOfFollowes <= 999) {
            rewardAmount = poolCategory[3];
          } else if (numberOfFollowes >= 1000 && numberOfFollowes <= 4999) {
            rewardAmount = poolCategory[4];
          } else if (numberOfFollowes >= 5000 && numberOfFollowes <= 9999) {
            rewardAmount = poolCategory[5];
          } else if (numberOfFollowes >= 10000) {
            rewardAmount = poolCategory[6];
          }
        }
        var likeStatus = {
          tweetId: req.params.tweetId,
          projectName,
          rewardAmount,
          paidTime: moment().unix(),
        };

        let userTweetData = await User.find({
          $and: [
            { _id: id },
            { projectName: projectName },
            { "raidStatus.likeStatus.tweetId": req.params.tweetId },
            { "raidStatus.likeStatus.projectName": projectName },
          ],
        });
        if (userTweetData.length === 0) {
          var T = new TwitterApi({
            appKey: process.env.TWITTER_CONSUMER_KEY,
            appSecret: process.env.TWITTER_CONSUMER_SECRET,
            accessToken: accessToken,
            accessSecret: accessTokenSecret,
          });

          let result = await T.v2.like(twitterId, req.params.tweetId);
          if (result.data.liked) {
            userStatusUpdated = await User.findOneAndUpdate(
              {
                twitterId: twitterId,
              },

              {
                $push: {
                  "raidStatus.likeStatus": likeStatus,
                },
              },
              {
                new: true,
              }
            );
            if (userStatusUpdated) {
              let wallet = await Wallet.findOne({
                accountHolder: mongoose.Types.ObjectId(projectCreator),
              });
              if (wallet) {
                var arrayString = wallet.privateKey.split(",");
                for (i = 0; i < arrayString.length; i++) {
                  arrayString[i] = parseInt(arrayString[i]);
                }
                let oldWallet = Keypair.fromSecretKey(
                  new Uint8Array(arrayString)
                );

                let clientAddress = oldWallet.publicKey;
                let tx = new Transaction();

                var usersPublicKey = [];
                const mintAddress = new PublicKey(splToken);
                for (i = 0; i < usersArray.length; i++) {
                  usersPublicKey.push(new PublicKey(usersArray[i]));
                }
                const users = usersPublicKey;
                let clientAta = (
                  await PublicKey.findProgramAddress(
                    [
                      clientAddress.toBuffer(),
                      TOKEN_PROGRAM_ID.toBuffer(),
                      mintAddress.toBuffer(), // mint address
                    ],
                    ASSOCIATED_TOKEN_PROGRAM_ID
                  )
                )[0];

                const [poolAta] =
                  await anchor.web3.PublicKey.findProgramAddress(
                    [
                      anchor.utils.bytes.utf8.encode("poolAta"),
                      clientAddress.toBuffer(),
                      mintAddress.toBuffer(),
                      Buffer.from(projectName),
                      Buffer.from(poolType),
                    ],
                    program.programId
                  );

                for (i = 0; i < users.length; i++) {
                  let userAta = (
                    await PublicKey.findProgramAddress(
                      [
                        users[i].toBuffer(),
                        TOKEN_PROGRAM_ID.toBuffer(),
                        mintAddress.toBuffer(), // mint address
                      ],
                      ASSOCIATED_TOKEN_PROGRAM_ID
                    )
                  )[0];

                  tx.feePayer = oldWallet.publicKey;

                  const userAtaCheck =
                    await solConnection.getTokenAccountsByOwner(users[i], {
                      mint: mintAddress,
                    });

                  if (userAtaCheck.value.length === 0) {
                    console.log(users[i].toString(), "no ata");
                    tx.add(
                      Token.createAssociatedTokenAccountInstruction(
                        ASSOCIATED_TOKEN_PROGRAM_ID,
                        TOKEN_PROGRAM_ID,
                        mintAddress,
                        userAta,
                        users[i],
                        oldWallet.publicKey
                      )
                    );
                  }

                  tx.add(
                    Token.createTransferInstruction(
                      TOKEN_PROGRAM_ID,
                      poolAta,
                      userAta,
                      oldWallet.publicKey,
                      [oldWallet],
                      rewardAmount * 1000_000_000
                    )
                  );
                }

                const txID = await solConnection.sendTransaction(tx, [
                  oldWallet,
                ]);

                res.send({
                  msg: "Reward Transfer Successfully",
                  tx: txID,
                  type: "success",
                });
                // res.send({ msg: "under development", YourWallet: oldWallet.publicKey.toString(), type: "success" });
              } else {
                alert("SomeThing went wrong");
              }
            } else {
              return res.send({
                msg: "unable Create Record",
                type: "Failed",
              });
            }
          } else {
            return res.send({
              msg: "unable to like tweet",
              type: "Failed",
            });
          }
        } else {
          return res.send({
            msg: "You have already liked the tweet",
            type: "Failed",
          });
        }
      } else {
        return res.send({
          msg: "You don't have enough follower",
          type: "Failed",
        });
      }
    } else {
      return res.send({ msg: "No Tweet Found", type: "Failed" });
    }
  } catch (error) {
    return res.send({
      msg: error.message,
      type: "Failed",
    });
  }
};

const replyToTweetWithTweetId = async (req, res) => {
  try {
    let { accessToken, accessTokenSecret, twitterId, id, publicKey } =
      req.userObj;
    let { projectName, mintAddress, projectCreator, tweetReply } = req.body;
    var splToken = mintAddress;
    var poolType = "raid";
    var usersArray = [publicKey];
    let tweetData = await Invoice.find({
      $and: [
        { invoiceCreater: mongoose.Types.ObjectId(projectCreator) },
        { projectName: projectName },
        { "pool.splToken": mintAddress },
        { "pool.tweets.tweetId": req.params.tweetId },
      ],
    });
    if (tweetData.length > 0) {
      var numberOfFollowes = 0;
      var poolCategory = [];
      var rewardAmount = 0;
      const headers = {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      };

      let response = await axios(
        `https://api.twitter.com/2/users/${twitterId}/followers`,
        {
          headers,
        }
      );
      numberOfFollowes = response.data.meta.result_count;
      if (numberOfFollowes > 0) {
        if (tweetData[0].pool.length > 0) {
          tweetData[0].pool.map((poolData) => {
            if (poolData.splToken === mintAddress) {
              poolCategory = poolData.category;
            }
          });

          if (numberOfFollowes >= 2 && numberOfFollowes <= 99) {
            rewardAmount = poolCategory[0];
          } else if (numberOfFollowes >= 100 && numberOfFollowes <= 299) {
            rewardAmount = poolCategory[1];
          } else if (numberOfFollowes >= 300 && numberOfFollowes <= 499) {
            rewardAmount = poolCategory[2];
          } else if (numberOfFollowes >= 500 && numberOfFollowes <= 999) {
            rewardAmount = poolCategory[3];
          } else if (numberOfFollowes >= 1000 && numberOfFollowes <= 4999) {
            rewardAmount = poolCategory[4];
          } else if (numberOfFollowes >= 5000 && numberOfFollowes <= 9999) {
            rewardAmount = poolCategory[5];
          } else if (numberOfFollowes >= 10000) {
            rewardAmount = poolCategory[6];
          }
        }
        var replyStatus = {
          tweetId: req.params.tweetId,
          projectName,
          rewardAmount,
          paidTime: moment().unix(),
        };

        let userTweetData = await User.find({
          $and: [
            { _id: id },
            { projectName: projectName },
            { "raidStatus.replyStatus.tweetId": req.params.tweetId },
            { "raidStatus.replyStatus.projectName": projectName },
          ],
        });
        if (userTweetData.length === 0) {
          var T = new TwitterApi({
            appKey: process.env.TWITTER_CONSUMER_KEY,
            appSecret: process.env.TWITTER_CONSUMER_SECRET,
            accessToken: accessToken,
            accessSecret: accessTokenSecret,
          });

          let result = await T.v2.reply(tweetReply, req.params.tweetId);
          if (result.data.text) {
            userStatusUpdated = await User.findOneAndUpdate(
              {
                twitterId: twitterId,
              },

              {
                $push: {
                  "raidStatus.replyStatus": replyStatus,
                },
              },
              {
                new: true,
              }
            );
            if (userStatusUpdated) {
              let wallet = await Wallet.findOne({
                accountHolder: mongoose.Types.ObjectId(projectCreator),
              });
              if (wallet) {
                var arrayString = wallet.privateKey.split(",");
                for (i = 0; i < arrayString.length; i++) {
                  arrayString[i] = parseInt(arrayString[i]);
                }
                let oldWallet = Keypair.fromSecretKey(
                  new Uint8Array(arrayString)
                );

                let clientAddress = oldWallet.publicKey;
                let tx = new Transaction();

                var usersPublicKey = [];
                const mintAddress = new PublicKey(splToken);
                for (i = 0; i < usersArray.length; i++) {
                  usersPublicKey.push(new PublicKey(usersArray[i]));
                }
                const users = usersPublicKey;
                let clientAta = (
                  await PublicKey.findProgramAddress(
                    [
                      clientAddress.toBuffer(),
                      TOKEN_PROGRAM_ID.toBuffer(),
                      mintAddress.toBuffer(), // mint address
                    ],
                    ASSOCIATED_TOKEN_PROGRAM_ID
                  )
                )[0];

                const [poolAta] =
                  await anchor.web3.PublicKey.findProgramAddress(
                    [
                      anchor.utils.bytes.utf8.encode("poolAta"),
                      clientAddress.toBuffer(),
                      mintAddress.toBuffer(),
                      Buffer.from(projectName),
                      Buffer.from(poolType),
                    ],
                    program.programId
                  );

                for (i = 0; i < users.length; i++) {
                  let userAta = (
                    await PublicKey.findProgramAddress(
                      [
                        users[i].toBuffer(),
                        TOKEN_PROGRAM_ID.toBuffer(),
                        mintAddress.toBuffer(), // mint address
                      ],
                      ASSOCIATED_TOKEN_PROGRAM_ID
                    )
                  )[0];

                  tx.feePayer = oldWallet.publicKey;

                  const userAtaCheck =
                    await solConnection.getTokenAccountsByOwner(users[i], {
                      mint: mintAddress,
                    });

                  if (userAtaCheck.value.length === 0) {
                    console.log(users[i].toString(), "no ata");
                    tx.add(
                      Token.createAssociatedTokenAccountInstruction(
                        ASSOCIATED_TOKEN_PROGRAM_ID,
                        TOKEN_PROGRAM_ID,
                        mintAddress,
                        userAta,
                        users[i],
                        oldWallet.publicKey
                      )
                    );
                  }

                  tx.add(
                    Token.createTransferInstruction(
                      TOKEN_PROGRAM_ID,
                      poolAta,
                      userAta,
                      oldWallet.publicKey,
                      [oldWallet],
                      rewardAmount * 1000_000_000
                    )
                  );
                }

                const txID = await solConnection.sendTransaction(tx, [
                  oldWallet,
                ]);

                res.send({
                  msg: "Reward Transfer Successfully",
                  tx: txID,
                  type: "success",
                });
                // res.send({ msg: "under development", YourWallet: oldWallet.publicKey.toString(), type: "success" });
              } else {
                alert("SomeThing went wrong");
              }
            } else {
              return res.send({
                msg: "Unable Create Record",
                type: "Failed",
              });
            }
          } else {
            return res.send({
              msg: "Unable To Reply To Tweet",
              type: "Failed",
            });
          }
        } else {
          return res.send({
            msg: "You Have Already Claimed Reward For Reply To This Tweet",
            type: "Failed",
          });
        }
      } else {
        return res.send({
          msg: "You don't have enough follower",
          type: "Failed",
        });
      }
    } else {
      return res.send({ msg: "No Tweet Found", type: "Failed" });
    }
  } catch (error) {
    return res.send({
      msg: error.message,
      type: "Failed",
    });
  }
};

const retweetATweet = async (req, res) => {
  try {
    let { accessToken, accessTokenSecret, twitterId, id, publicKey } =
      req.userObj;
    let { projectName, mintAddress, projectCreator } = req.body;

    var splToken = mintAddress;
    var poolType = "raid";
    var usersArray = [publicKey];
    let tweetData = await Invoice.find({
      $and: [
        { invoiceCreater: mongoose.Types.ObjectId(projectCreator) },
        { projectName: projectName },
        { "pool.splToken": mintAddress },
        { "pool.tweets.tweetId": req.params.tweetId },
      ],
    });
    if (tweetData.length > 0) {
      var numberOfFollowes = 0;
      var poolCategory = [];
      var rewardAmount;
      const headers = {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      };

      let response = await axios(
        `https://api.twitter.com/2/users/${twitterId}/followers`,
        {
          headers,
        }
      );
      numberOfFollowes = response.data.meta.result_count;
      if (numberOfFollowes > 0) {
        if (tweetData[0].pool.length > 0) {
          tweetData[0].pool.map((poolData) => {
            if (poolData.splToken === mintAddress) {
              poolCategory = poolData.category;
            }
          });

          if (numberOfFollowes >= 2 && numberOfFollowes <= 99) {
            rewardAmount = poolCategory[0];
          } else if (numberOfFollowes >= 100 && numberOfFollowes <= 299) {
            rewardAmount = poolCategory[1];
          } else if (numberOfFollowes >= 300 && numberOfFollowes <= 499) {
            rewardAmount = poolCategory[2];
          } else if (numberOfFollowes >= 500 && numberOfFollowes <= 999) {
            rewardAmount = poolCategory[3];
          } else if (numberOfFollowes >= 1000 && numberOfFollowes <= 4999) {
            rewardAmount = poolCategory[4];
          } else if (numberOfFollowes >= 5000 && numberOfFollowes <= 9999) {
            rewardAmount = poolCategory[5];
          } else if (numberOfFollowes >= 10000) {
            rewardAmount = poolCategory[6];
          }
        }
        var retweetStatus = {
          tweetId: req.params.tweetId,
          projectName,
          rewardAmount,
          paidTime: moment().unix(),
        };
        let userTweetData = await User.find({
          $and: [
            { _id: id },
            { projectName: projectName },
            { "raidStatus.retweetStatus.tweetId": req.params.tweetId },
            { "raidStatus.retweetStatus.projectName": projectName },
          ],
        });
        if (userTweetData.length === 0) {
          var T = new TwitterApi({
            appKey: process.env.TWITTER_CONSUMER_KEY,
            appSecret: process.env.TWITTER_CONSUMER_SECRET,
            accessToken: accessToken,
            accessSecret: accessTokenSecret,
          });

          let result = await T.v2.retweet(twitterId, req.params.tweetId);
          if (result.data.retweeted) {
            userStatusUpdated = await User.findOneAndUpdate(
              {
                twitterId: twitterId,
              },

              {
                $push: {
                  "raidStatus.retweetStatus": retweetStatus,
                },
              },
              {
                new: true,
              }
            );
            if (userStatusUpdated) {
              let wallet = await Wallet.findOne({
                accountHolder: mongoose.Types.ObjectId(projectCreator),
              });
              if (wallet) {
                var arrayString = wallet.privateKey.split(",");
                for (i = 0; i < arrayString.length; i++) {
                  arrayString[i] = parseInt(arrayString[i]);
                }
                let oldWallet = Keypair.fromSecretKey(
                  new Uint8Array(arrayString)
                );

                let clientAddress = oldWallet.publicKey;
                let tx = new Transaction();

                var usersPublicKey = [];
                const mintAddress = new PublicKey(splToken);
                for (i = 0; i < usersArray.length; i++) {
                  usersPublicKey.push(new PublicKey(usersArray[i]));
                }
                const users = usersPublicKey;
                let clientAta = (
                  await PublicKey.findProgramAddress(
                    [
                      clientAddress.toBuffer(),
                      TOKEN_PROGRAM_ID.toBuffer(),
                      mintAddress.toBuffer(), // mint address
                    ],
                    ASSOCIATED_TOKEN_PROGRAM_ID
                  )
                )[0];

                const [poolAta] =
                  await anchor.web3.PublicKey.findProgramAddress(
                    [
                      anchor.utils.bytes.utf8.encode("poolAta"),
                      clientAddress.toBuffer(),
                      mintAddress.toBuffer(),
                      Buffer.from(projectName),
                      Buffer.from(poolType),
                    ],
                    program.programId
                  );

                for (i = 0; i < users.length; i++) {
                  let userAta = (
                    await PublicKey.findProgramAddress(
                      [
                        users[i].toBuffer(),
                        TOKEN_PROGRAM_ID.toBuffer(),
                        mintAddress.toBuffer(), // mint address
                      ],
                      ASSOCIATED_TOKEN_PROGRAM_ID
                    )
                  )[0];

                  tx.feePayer = oldWallet.publicKey;

                  const userAtaCheck =
                    await solConnection.getTokenAccountsByOwner(users[i], {
                      mint: mintAddress,
                    });

                  if (userAtaCheck.value.length === 0) {
                    console.log(users[i].toString(), "no ata");
                    tx.add(
                      Token.createAssociatedTokenAccountInstruction(
                        ASSOCIATED_TOKEN_PROGRAM_ID,
                        TOKEN_PROGRAM_ID,
                        mintAddress,
                        userAta,
                        users[i],
                        oldWallet.publicKey
                      )
                    );
                  }

                  tx.add(
                    Token.createTransferInstruction(
                      TOKEN_PROGRAM_ID,
                      poolAta,
                      userAta,
                      oldWallet.publicKey,
                      [oldWallet],
                      rewardAmount * 1000_000_000
                    )
                  );
                }

                const txID = await solConnection.sendTransaction(tx, [
                  oldWallet,
                ]);

                res.send({
                  msg: "Reward Transfer Successfully",
                  tx: txID,
                  type: "success",
                });
                // res.send({ msg: "under development", YourWallet: oldWallet.publicKey.toString(), type: "success" });
              } else {
                alert("SomeThing went wrong");
              }
            } else {
              return res.send({
                msg: "Unable Create Record",
                type: "Failed",
              });
            }
          } else {
            return res.send({
              msg: "Unable To Retweet Tweet",
              type: "Failed",
            });
          }
        } else {
          return res.send({
            msg: "You Have Already Retweet The Tweet",
            type: "Failed",
          });
        }
      } else {
        return res.send({
          msg: "You don't have enough follower",
          type: "Failed",
        });
      }
    } else {
      return res.send({ msg: "No Tweet Found", type: "Failed" });
    }
  } catch (error) {
    return res.send({
      msg: error.message,
      type: "Failed",
    });
  }
};

const mentionClaim = async (req, res) => {
  try {
    let { twitterId, id, publicKey } = req.userObj;
    let { projectName, rewardToken, tweetText, projectCreator } = req.body;
    var rewardStatus = {
      projectName,
      rewardToken,
      tweetId: req.params.tweetId,
      tweetText,
      tweetCreatedAt: moment().unix(),
    };
    let tweetData = await Invoice.find({
      $and: [
        { invoiceCreater: mongoose.Types.ObjectId(projectCreator) },
        { projectName: projectName },
        { isRaid: false },
        { "pool.splToken": rewardToken },
      ],
    });
    if (tweetData.length > 0) {
      var numberOfFollowes = 0;
      var poolCategory = [];
      var rewardFrequencyInSecond = 86400;
      var projectStartTime = 0;
      var rewardAmount = 0;
      const headers = {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      };

      let response = await axios(
        `https://api.twitter.com/2/users/${twitterId}/followers`,
        {
          headers,
        }
      );
      numberOfFollowes = response.data.meta.result_count;
      if (numberOfFollowes > 0) {
        if (tweetData[0].pool.length > 0) {
          tweetData[0].pool.map((poolData) => {
            if (poolData.splToken === rewardToken) {
              poolCategory = poolData.category;
              projectStartTime = parseInt(poolData.startTime);

              if (poolData.rewardFrequency === "week") {
                rewardFrequencyInSecond = 7 * 86400;
              } else if (poolData.rewardFrequency === "month") {
                rewardFrequencyInSecond = 30 * 86400;
              }
            }
          });

          if (numberOfFollowes >= 2 && numberOfFollowes <= 99) {
            rewardAmount = poolCategory[0];
          } else if (numberOfFollowes >= 100 && numberOfFollowes <= 299) {
            rewardAmount = poolCategory[1];
          } else if (numberOfFollowes >= 300 && numberOfFollowes <= 499) {
            rewardAmount = poolCategory[2];
          } else if (numberOfFollowes >= 500 && numberOfFollowes <= 999) {
            rewardAmount = poolCategory[3];
          } else if (numberOfFollowes >= 1000 && numberOfFollowes <= 4999) {
            rewardAmount = poolCategory[4];
          } else if (numberOfFollowes >= 5000 && numberOfFollowes <= 9999) {
            rewardAmount = poolCategory[5];
          } else if (numberOfFollowes >= 10000) {
            rewardAmount = poolCategory[6];
          }
        }
        let userPoolData = await User.findOne({
          $and: [
            { _id: id },
            { projectName: projectName },
            { "rewardStatus.tweetId": req.params.tweetId },
            { "rewardStatus.projectName": projectName },
            { "rewardStatus.rewardToken": rewardToken },
          ],
        });
        if (!userPoolData) {
          if (projectStartTime + rewardFrequencyInSecond > moment().unix()) {
            return res.send({
              msg: "Please Wait, let the project start",
              type: "Failed",
            });
          }
          const headers = {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
          };

          let response = await fetch(
            `https://api.twitter.com/2/tweets/${req.params.tweetId}?expansions=author_id&user.fields=name&tweet.fields=created_at`,
            {
              headers,
            }
          );
          if (!response) {
            return res.send({
              msg: "No tweet found",
              type: "Failed",
            });
          }
          let userTweetRecord = await response.json();

          let liveTweetCreatedAt = moment(
            userTweetRecord.data.created_at
          ).unix();

          if (liveTweetCreatedAt + rewardFrequencyInSecond > moment().unix()) {
            return res.send({
              msg: "Please Wait... after tweeting a tweet",
              type: "Failed",
            });
          }
          userStatusUpdated = await User.findOneAndUpdate(
            {
              twitterId: twitterId,
            },

            {
              $push: {
                rewardStatus: rewardStatus,
              },
            },
            {
              new: true,
            }
          );
          if (userStatusUpdated) {
            var reward = await Reward.findOneAndUpdate(
              {
                $and: [
                  {
                    users: { $elemMatch: { projectName } },
                  },
                  {
                    users: { $elemMatch: { mintAddress: rewardToken } },
                  },
                ],
              },
              {
                $push: {
                  users: [
                    {
                      tweetId: req.params.tweetId,
                      userId: id,
                      isPaid: false,
                      reawrdAmount: rewardAmount,
                      projectName,
                      mintAddress: rewardToken,
                      isRaid: false,
                      invoiceCreator: projectCreator,
                      userPublicKey: publicKey,
                    },
                  ],
                },
              }
            );
            if (!reward) {
              reward = new Reward({
                users: [
                  {
                    tweetId: req.params.tweetId,
                    userId: id,
                    isPaid: false,
                    reawrdAmount: rewardAmount,
                    projectName,
                    mintAddress: rewardToken,
                    isRaid: false,
                    invoiceCreator: projectCreator,
                    userPublicKey: publicKey,
                  },
                ],
              });
              await reward.save();
            }

            return res.send({
              data: reward,
              msg: "applied successfully",
              type: "Success",
            });
          }
        } else {
          var latestPaidTime = 0;
          var currentTweetCreatedAt = 0;

          let userData = await User.findOne({ _id: id });
          if (userData && userData.rewardStatus) {
            userData.rewardStatus.map((reward) => {
              if (
                reward.projectName === projectName &&
                reward.rewardToken === rewardToken
              ) {
                if (reward.paidTime) {
                  if (parseInt(reward.paidTime) > latestPaidTime) {
                    latestPaidTime = parseInt(reward.paidTime);
                  }
                }
                if (reward.tweetId === req.params.tweetId) {
                  currentTweetCreatedAt = parseInt(reward.tweetCreatedAt);
                }
              }
            });
            if (projectStartTime + rewardFrequencyInSecond > moment().unix()) {
              return res.send({
                msg: "Please Wait, let the project start",
                type: "Failed",
              });
            } else {
              if (latestPaidTime + rewardFrequencyInSecond > moment().unix()) {
                return res.send({
                  msg: "Please Wait after the claim of a tweet",
                  type: "Failed",
                });
              } else {
                if (
                  currentTweetCreatedAt + rewardFrequencyInSecond >
                  moment().unix()
                ) {
                  return res.send({
                    msg: "Please Wait after tweeting a tweet",
                    type: "Failed",
                  });
                } else {
                  var reward = await Reward.findOneAndUpdate(
                    {
                      $and: [
                        {
                          users: { $elemMatch: { projectName } },
                        },
                        {
                          users: { $elemMatch: { mintAddress: rewardToken } },
                        },
                      ],
                    },
                    {
                      $push: {
                        users: [
                          {
                            tweetId: req.params.tweetId,
                            userId: id,
                            isPaid: false,
                            reawrdAmount: rewardAmount,
                            projectName,
                            mintAddress: rewardToken,
                            isRaid: false,
                            invoiceCreator: projectCreator,
                            userPublicKey: publicKey,
                          },
                        ],
                      },
                    }
                  );
                  if (!reward) {
                    reward = new Reward({
                      users: [
                        {
                          tweetId: req.params.tweetId,
                          userId: id,
                          isPaid: false,
                          reawrdAmount: rewardAmount,
                          projectName,
                          mintAddress: rewardToken,
                          isRaid: false,
                          invoiceCreator: projectCreator,
                          userPublicKey: publicKey,
                        },
                      ],
                    });
                    await reward.save();
                  }
                  return res.send({
                    data: reward,
                    msg: "Applied Successfully",
                    type: "Success",
                  });
                }
              }
            }
          } else {
            return res.send({
              msg: "No Record found",
              type: "Failed",
            });
          }
        }
      } else {
        return res.send({
          msg: "You don't have enough follower",
          type: "Failed",
        });
      }
    } else {
      return res.send({ msg: "No Tweet Found", type: "Failed" });
    }
  } catch (error) {
    return res.send({
      msg: error.message,
      type: "Failed",
    });
  }
};

module.exports = {
  getUserIdFromName,
  getUserMentions,
  getUserFollowers,
  getTweetById,
  getTweetliked,
  getRetweets,
  getQuotedTweetsByTweetId,
  getAllReplyForATweet,
  likeSpecificTweet,
  replyToTweetWithTweetId,
  retweetATweet,
  mentionClaim,
};
