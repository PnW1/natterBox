const mongoose = require("mongoose");
const moment = require("moment");
const Reward = require("../../model/reward");
const User = require("../../model/userModel");
const Wallet = require("../../model/walletModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");
const { Program, web3 } = require("@project-serum/anchor");
const anchor = require("@project-serum/anchor");
const bs58 = require("bs58");
const nacl = require("tweetnacl");

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

const getUserRewardDetail = async (req, res) => {
  try {
    const { id } = req.userObj;

    var userRewardDetails = await User.findOne({ _id: id });
    if (userRewardDetails) {
      var tempArray = [];
      var rewardCount = 0;
      var tempArrayForMention = [];
      var rewardCountForMention = 0;
      if (userRewardDetails.raidStatus.likeStatus.length > 0) {
        userRewardDetails.raidStatus.likeStatus.map((data) => {
          tempArray.push(data);
          rewardCount = rewardCount + 1;
        });
      }
      if (userRewardDetails.raidStatus.retweetStatus.length > 0) {
        userRewardDetails.raidStatus.retweetStatus.map((data) => {
          tempArray.push(data);
          rewardCount = rewardCount + 1;
        });
      }
      if (userRewardDetails.raidStatus.replyStatus.length > 0) {
        userRewardDetails.raidStatus.replyStatus.map((data) => {
          tempArray.push(data);
          rewardCount = rewardCount + 1;
        });
      }
      if (userRewardDetails.rewardStatus.length > 0) {
        userRewardDetails.rewardStatus.map((data) => {
          tempArrayForMention.push(data);
          rewardCountForMention = rewardCountForMention + 1;
        });
      }
      return res.send({
        raidCount: rewardCount,
        raidRewardData: tempArray,
        mentionCount: rewardCountForMention,
        mentionRewardData: tempArrayForMention,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getRecords = async (req, res) => {
  try {
    const { projectName, mintAddress, creator } = req.params;
    var limit = 50;
    var reward = await Reward.find({
      users: {
        $elemMatch: {
          projectName,
          mintAddress,
          isRaid: false,
          invoiceCreator: creator,
        },
      },
    });
    let tempArray = [];
    if (reward && reward.length > 0) {
      reward.map((data) => {
        if (data.users && data.users.length > 0) {
          data.users.map((user) => {
            if (user.isPaid === false) {
              if (tempArray && tempArray.length < limit) {
                tempArray.push(user);
              }
            }
          });
        }
      });
      return res.send({ reward: tempArray });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const addRewardRecord = async (req, res) => {
  try {
    const {
      tweetId,
      userId,
      tweetStatus,
      reawrdAmount,
      projectName,
      mintAddress,
      isRaid,
      invoiceCreaterPublicKey,
      userPublicKey,
    } = req.body;
    // for (let i = 0; i < 50; i++) {
    // console.log(i);

    // var poolData;
    // if (isRaid) {
    //   poolData = await Invoice.find({
    //     $and: [
    //       { projectName },
    //       { isRaid },
    //       { "pool.splToken": mintAddress },
    //       { "pool.tweets.tweetId": tweetId },
    //     ],
    //   });
    //   if (!poolData) {
    //     return res.send({
    //       msg: "No project Found",
    //       type: "failed",
    //     });
    //   }
    // } else {
    //   poolData = await Invoice.find({
    //     $and: [{ projectName }, { isRaid }, { "pool.splToken": mintAddress }],
    //   });
    //   if (!poolData) {
    //     return res.send({
    //       msg: "No project Found",
    //       type: "failed",
    //     });
    //   }
    // }
    // var rewardRecord = await Reward.findOne({
    //   $and: [
    //     {
    //       users: { $elemMatch: { projectName } },
    //     },
    //     {
    //       users: { $elemMatch: { mintAddress } },
    //     },
    //     {
    //       users: { $elemMatch: { userId } },
    //     },
    //     {
    //       users: { $elemMatch: { tweetId } },
    //     },
    //     {
    //       users: { $elemMatch: { tweetStatus } },
    //     },
    //   ],
    // });

    // if (rewardRecord) {
    //   return res.send({
    //     msg: "You have already applied",
    //     type: "error",
    //   });
    // }

    var reward = await Reward.findOneAndUpdate(
      {
        $and: [
          {
            users: { $elemMatch: { projectName } },
          },
          {
            users: { $elemMatch: { mintAddress } },
          },
        ],
      },
      {
        $push: {
          users: [
            {
              tweetId,
              userId,
              tweetStatus,
              isPaid: false,
              reawrdAmount: 0,
              projectName,
              mintAddress,
              isRaid,
              invoiceCreaterPublicKey,
              userPublicKey,
            },
          ],
        },
      }
    );
    if (!reward) {
      reward = new Reward({
        users: [
          {
            tweetId,
            userId,
            tweetStatus,
            isPaid: false,
            reawrdAmount,
            projectName,
            mintAddress,
            isRaid,
            invoiceCreaterPublicKey,
            userPublicKey,
          },
        ],
      });
      await reward.save();
    }
    return res.send(reward);
    // }
  } catch (error) {
    console.log(error.message);
  }
};
const updateRewardRecord = async (req, res) => {
  try {
    const { role } = req.userObj;
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    var reward;
    const { projectName, rewardToken, usersArray, isRaid } = req.body;
    for (let i = 0; i < usersArray.length; i++) {
      reward = await Reward.findOneAndUpdate(
        {
          users: {
            $elemMatch: {
              tweetId: usersArray[i].tweetIds,
              userId: usersArray[i].userId,
              projectName,
              mintAddress: rewardToken,
              isRaid,
              invoiceCreator: req.userObj.id,
              isPaid: false,
            },
          },
        },
        {
          $set: {
            "users.$.isPaid": true,
          },
        },
        {
          new: true,
        }
      );

      let updatedUserRecord = await User.updateOne(
        {
          $and: [
            { _id: usersArray[i].userId },
            {
              rewardStatus: {
                $elemMatch: {
                  tweetId: usersArray[i].tweetIds,
                  projectName: projectName,
                  rewardToken: rewardToken,
                  isRewardpaid: false,
                },
              },
            },
          ],
        },

        {
          $set: {
            "rewardStatus.$.isRewardpaid": true,
            "rewardStatus.$.paidTime": moment().unix(),
          },
        }
      );
    }
    let wallet = await Wallet.findOne({
      accountHolder: mongoose.Types.ObjectId(req.userObj.id),
    });
    if (wallet) {
      var arrayString = wallet.privateKey.split(",");
      for (i = 0; i < arrayString.length; i++) {
        arrayString[i] = parseInt(arrayString[i]);
      }
      let oldWallet = Keypair.fromSecretKey(new Uint8Array(arrayString));
      var poolType = "mention";
      let clientAddress = oldWallet.publicKey;
      let tx = new Transaction();

      var usersPublicKey = [];
      const mintAddress = new PublicKey(rewardToken);
      for (i = 0; i < usersArray.length; i++) {
        usersPublicKey.push(new PublicKey(usersArray[i].userPublicKey));
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

      const [poolAta] = await anchor.web3.PublicKey.findProgramAddress(
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

        const userAtaCheck = await solConnection.getTokenAccountsByOwner(
          users[i],
          { mint: mintAddress }
        );

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
        console.log(
          poolAta.toString(),
          "poolAta",
          userAta.toString(),
          "userAta"
        );
        tx.add(
          Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            poolAta,
            userAta,
            oldWallet.publicKey,
            [oldWallet],
            100_000
          )
        );
      }

      const txID = await solConnection.sendTransaction(tx, [oldWallet]);

      res.send({
        msg: "reward successfully transfer",
        tx: txID,
        type: "success",
      });
    } else {
      res.send({ msg: "Something went wrong", type: "failed" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getRecords,
  addRewardRecord,
  updateRewardRecord,
  getUserRewardDetail,
};
