const mongoose = require("mongoose");
const Wallet = require("../../model/walletModel");
const axios = require("axios");
const CheckRoleAccess = require("../../util/CheckRoleAccess");
// const { encryptFunc } = require("../../util/cryptoFunc");
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
const CreateInvoiceController = require("../invoice/CreateInvoiceController");
const { publicKey } = require("@project-serum/anchor/dist/cjs/utils");

// import { Program, web3 } from "@project-serum/anchor";
// import * as anchor from "@project-serum/anchor";
// import {
//     TOKEN_PROGRAM_ID,
//     ASSOCIATED_TOKEN_PROGRAM_ID,
//     NATIVE_MINT,
//     Token,
//   } from "@solana/spl-token";

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

const getWallet = async (req, res) => {
  const { role } = req.userObj;
  const isEligible = CheckRoleAccess(["admin", "manager"], role);
  if (!isEligible) {
    return res.status(401).send({
      msg: "You are not allowed to access this service...contact your admin..",
      type: "error",
    });
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
    let balance = await solConnection.getBalance(oldWallet.publicKey);
    return res.send({
      publicKey: oldWallet.publicKey,
      solBalance: balance,
      msg: "success",
    });
  } else {
    return res.send({
      msg: "wallet Not found",
    });
  }
};
const createWallet = async (req, res) => {
  try {
    const { role } = req.userObj;
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    const { userId } = req.body;

    let wallet = await Wallet.findOne({
      accountHolder: mongoose.Types.ObjectId(userId),
    });
    if (!wallet) {
      const newWallet = Keypair.generate();
      privateKey = newWallet.secretKey;
      const walletData = new Wallet({
        accountHolder: mongoose.Types.ObjectId(userId),
        publicKey: newWallet.publicKey.toString(),
        privateKey: newWallet.secretKey,
      });
      await walletData.save();
      return res.send({
        msg: "Wallet Created Successfully",
        PublicKey: newWallet.publicKey.toString(),
        type: "success",
      });
    } else {
      return res.send({
        msg: "Wallet Already Exist",
        type: "success",
      });
    }
  } catch (e) {
    console.log(e.message, " err-in createWalletController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

const airDrop = async (req, res) => {
  try {
    const { role } = req.userObj;
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
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
      const { usersArray, splToken, projectName, isRaid } = req.body;
      var poolType;
      if (isRaid) {
        poolType = "raid";
      } else {
        poolType = "mention";
      }
      let clientAddress = oldWallet.publicKey;
      let tx = new Transaction();

      var usersPublicKey = [];
      const mintAddress = new PublicKey(splToken);
      for (i = 0; i < usersArray.length; i++) {
        usersPublicKey.push(new PublicKey(usersArray[i].users));
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
        msg: "under development",
        YourWallet: oldWallet.publicKey.toString(),
        tx: txID,
        type: "success",
      });
      // res.send({ msg: "under development", YourWallet: oldWallet.publicKey.toString(), type: "success" });
    } else {
      alert("SomeThing went wrong");
    }
  } catch (e) {
    console.log(e.message, " err-in createWalletController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

const initializeUserPool = async (req, res) => {
  try {
    const { role } = req.userObj;
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    let walletObject = await Wallet.findOne({
      accountHolder: mongoose.Types.ObjectId(req.userObj.id),
    });
    if (walletObject) {
      var arrayString = walletObject.privateKey.split(",");
      for (i = 0; i < arrayString.length; i++) {
        arrayString[i] = parseInt(arrayString[i]);
      }
      let oldWallet = Keypair.fromSecretKey(new Uint8Array(arrayString));
      let { funds, startTime, timeLimit, splToken, projectName, isRaid } =
        req.body;
      let poolType;
      if (isRaid) {
        poolType = "raid";
      } else {
        poolType = "mention";
      }
      funds = parseFloat(funds) * 1000000000;

      const blockhashResponse =
        await solConnection.getLatestBlockhashAndContext();
      const lastValidBlockHeight = blockhashResponse.context.slot + 150;
      let blockheight = await solConnection.getBlockHeight();
      const mintAddress = new PublicKey(splToken);

      const [globalAuth, globalBump] =
        await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from("global-authority")],
          program.programId
        );
      console.log(globalAuth.toString(), "globalAuth");

      const [poolAddress] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("pool"),
          oldWallet.publicKey.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
          Buffer.from(poolType),
        ],
        program.programId
      );
      console.log(poolAddress.toString(), "poolAddress");

      const [poolSolAddress] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("pool"),
          oldWallet.publicKey.toBuffer(),
        ],
        SystemProgram.programId
      );
      console.log(poolSolAddress.toString(), "poolSolAddress");

      let clientAta = (
        await PublicKey.findProgramAddress(
          [
            oldWallet.publicKey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintAddress.toBuffer(), // mint address
          ],
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      )[0];
      console.log(mintAddress.toString(), "mint Address");
      console.log(NATIVE_MINT == mintAddress, "Mint native");

      console.log(clientAta.toString(), "associatedTokenAccountPubkey");
      const [poolAta] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("poolAta"),
          oldWallet.publicKey.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
          Buffer.from(poolType),
        ],
        program.programId
      );
      console.log(poolAta.toString(), "poolAta");
      const userAtaCheck = await solConnection.getTokenAccountsByOwner(
        oldWallet.publicKey,
        { mint: mintAddress }
      );
      const newTx = new Transaction();
      newTx.recentBlockhash = blockhashResponse.value.blockhash;
      let instructions = [];
      if (userAtaCheck.value.length === 0) {
        if (NATIVE_MINT.toString() === mintAddress.toString()) {
          instructions.push(
            Token.createAssociatedTokenAccountInstruction(
              ASSOCIATED_TOKEN_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              mintAddress,
              clientAta,
              oldWallet.publicKey,
              oldWallet.publicKey
            )
          );
          instructions.push(
            SystemProgram.transfer({
              fromPubkey: oldWallet.publicKey,
              toPubkey: clientAta,
              lamports: funds,
            })
          );
          instructions.push(
            Token.createSyncNativeInstruction(TOKEN_PROGRAM_ID, clientAta)
          );
          console.log("wrapped");
        }
      } else {
        if (NATIVE_MINT.toString() === mintAddress.toString()) {
          instructions.push(
            SystemProgram.transfer({
              fromPubkey: oldWallet.publicKey,
              toPubkey: clientAta,
              lamports: funds,
            }),
            Token.createSyncNativeInstruction(TOKEN_PROGRAM_ID, clientAta)
          );
        }
      }

      console.log(oldWallet.publicKey.toString(), "public key");

      // const txNew = new Transaction();
      // txNew.recentBlockhash = blockhashResponse.value.blockhash;

      // txNew.feePayer = oldWallet.publicKey;
      // if (instructions.length > 0) txNew.add(instructions);
      const tx = await program.rpc.initializeUserPool(
        poolType,
        projectName,
        startTime,
        new anchor.BN(timeLimit),
        new anchor.BN(funds),
        {
          accounts: {
            client: oldWallet.publicKey,
            globalAuthority: globalAuth,
            pool: poolAddress,
            // poolSol: poolSolAddress,
            poolAta: poolAta,
            poolMint: mintAddress,
            clientAta: clientAta,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
          signers: [oldWallet],
          instructions,
        }
      );
      res.send({
        msg: "pool created",
        YourWallet: oldWallet.publicKey.toString(),
        tx: tx,
        poolAddress,
        type: "success",
      });
    } else {
      res.send({
        msg: "Wallet Not Found",
        YourWallet: "Wallet Not Found",
        type: "fail",
      });
    }
  } catch (e) {
    console.log(e.message, " err-in createWalletController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

const createTweet = async (req, res) => {
  try {
    const { role } = req.userObj;
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    let walletObject = await Wallet.findOne({
      accountHolder: mongoose.Types.ObjectId(req.userObj.id),
    });
    if (walletObject) {
      var arrayString = walletObject.privateKey.split(",");
      for (i = 0; i < arrayString.length; i++) {
        arrayString[i] = parseInt(arrayString[i]);
      }
      let oldWallet = Keypair.fromSecretKey(new Uint8Array(arrayString));
      const clientAddress = oldWallet.publicKey;

      let { tweetId, splToken, projectName, isRaid } = req.body;

      var poolType;
      if (isRaid) {
        poolType = "raid";
      } else {
        poolType = "mention";
      }

      const mintAddress = new PublicKey(splToken);
      const [tweetAta, bump] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("tweets"),
          // userAddress.publicKey.toBuffer(),
          Buffer.from(tweetId),
          Buffer.from(projectName),
          Buffer.from(poolType),
        ],
        program.programId
      );

      const [poolAddress] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("pool"),
          clientAddress.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
          Buffer.from(poolType),
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
        oldWallet.publicKey,
        { mint: mintAddress }
      );

      const userForLikeAddress = await PublicKey.createWithSeed(
        oldWallet.publicKey,
        `like-${tweetId}`,
        program.programId
      );
      console.log(userForLikeAddress.toString(), "retweet");
      const userForRetweetAddress = await PublicKey.createWithSeed(
        oldWallet.publicKey,
        `retweet-${tweetId}`,
        program.programId
      );
      console.log(userForRetweetAddress.toString(), "comment");
      const userForCommentAddress = await PublicKey.createWithSeed(
        oldWallet.publicKey,
        `comment-${tweetId}`,
        program.programId
      );
      console.log(userForCommentAddress.toString(), "like");

      // console.log(prizeTokenAccount.value[0].pubkey.toString())

      let associatedTokenAccountPubkey = (
        await PublicKey.findProgramAddress(
          [
            oldWallet.publicKey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintAddress.toBuffer(), // mint address
          ],
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      )[0];

      console.log(
        associatedTokenAccountPubkey.toString(),
        "associatedTokenAccountPubkey"
      );
      console.log(tweetAta.toString(), bump, "tweetAta");
      console.log(poolAddress.toString(), "poolAddress");

      let instructions = [
        SystemProgram.createAccountWithSeed({
          fromPubkey: oldWallet.publicKey,
          basePubkey: oldWallet.publicKey, // clientAddress
          seed: `like-${tweetId}`,
          newAccountPubkey: userForLikeAddress,
          lamports: await solConnection.getMinimumBalanceForRentExemption(
            16016
          ),
          space: 16016,
          programId: program.programId,
        }),
        SystemProgram.createAccountWithSeed({
          fromPubkey: oldWallet.publicKey,
          basePubkey: oldWallet.publicKey, // clientAddress
          seed: `retweet-${tweetId}`,
          newAccountPubkey: userForRetweetAddress,
          lamports: await solConnection.getMinimumBalanceForRentExemption(
            16016
          ),
          space: 16016,
          programId: program.programId,
        }),
        SystemProgram.createAccountWithSeed({
          fromPubkey: oldWallet.publicKey,
          basePubkey: oldWallet.publicKey, // clientAddress
          seed: `comment-${tweetId}`,
          newAccountPubkey: userForCommentAddress,
          lamports: await solConnection.getMinimumBalanceForRentExemption(
            16016
          ),
          space: 16016,
          programId: program.programId,
        }),
      ];

      const tx = await program.rpc.createTweetRaid(
        globalBump,
        poolType,
        projectName,
        tweetId,
        {
          accounts: {
            user: oldWallet.publicKey,
            client: clientAddress,
            tweetData: tweetAta,
            usersForLike: userForLikeAddress,
            usersForRetweet: userForRetweetAddress,
            usersForComment: userForCommentAddress,
            globalAuthority: globalAuth,
            pool: poolAddress,
            // userAta: prizeTokenAccount.value[0].pubkey,
            poolMint: mintAddress,
            // poolMint: new PublicKey("So11111111111111111111111111111111111111112"),
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: SYSVAR_RENT_PUBKEY,
          },
          signers: [oldWallet],
          instructions,
        }
      );

      res.send({
        msg: "tweet created",
        YourWallet: oldWallet.publicKey.toString(),
        tx: tx,
        type: "success",
      });
    } else {
      res.send({
        YourWallet: "Wallet Not Found",
        type: "fail",
      });
    }
  } catch (e) {
    console.log(e.message, " err-in createUserController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

const tweetAction = async (req, res) => {
  try {
    const {
      userAddress,
      number,
      isRaid,
      numberOfFollowes,
      tweetId,
      projectName,
      clientId,
      splToken,
    } = req.body;
    var poolType;
    if (isRaid) {
      poolType = "raid";
    } else {
      poolType = "mention";
    }

    let walletObject = await Wallet.findOne({
      accountHolder: mongoose.Types.ObjectId(clientId),
    });
    if (walletObject) {
      var arrayString = walletObject.privateKey.split(",");
      for (i = 0; i < arrayString.length; i++) {
        arrayString[i] = parseInt(arrayString[i]);
      }
      let oldWallet = Keypair.fromSecretKey(new Uint8Array(arrayString));
      const mintAddress = new PublicKey(splToken);
      console.log(number, userAddress, "user Address");
      const userPublicKey = new PublicKey(userAddress);
      const clientAddress = oldWallet.publicKey;
      // const numberOfFollowes = 5000;
      const amount = numberOfFollowes;

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
      console.log(userForLikeAddress.toString(), "like");
      const [tweetAta, bump] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("tweets"),
          // provider.wallet.publicKey.toBuffer(),
          Buffer.from(tweetId),
          Buffer.from(projectName),
          Buffer.from(poolType),
        ],
        program.programId
      );

      const [poolAddress] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("pool"),
          clientAddress.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
          Buffer.from(poolType),
        ],
        program.programId
      );

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

      const [globalAuth, globalBump] =
        await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from("global-authority")],
          // new anchor.BN(id).toArrayLike(Buffer)],
          program.programId
        );

      let userAta = (
        await PublicKey.findProgramAddress(
          [
            userPublicKey.toBuffer(),
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
      console.log(clientAddress.toString(), "clientAddress");
      // console.log(
      //   await solConnection.getMinimumBalanceForRentExemption(336),
      //   "lamports"
      // );
      const userAtaCheck = await solConnection.getTokenAccountsByOwner(
        userPublicKey,
        { mint: mintAddress }
      );
      console.log(userAtaCheck);
      let instructions = [];
      if (userAtaCheck.value.length === 0) {
        console.log("2nd condition");
        instructions.push(
          Token.createAssociatedTokenAccountInstruction(
            ASSOCIATED_TOKEN_PROGRAM_ID,
            TOKEN_PROGRAM_ID,
            mintAddress,
            userAta,
            userPublicKey,
            clientAddress
          )
        );
      }

      if (number === 1) {
        const tx = await program.rpc.likeTweet(
          globalBump,
          projectName,
          tweetId,
          new anchor.BN(amount),
          {
            accounts: {
              user: userPublicKey,
              client: clientAddress,
              // tweetData: tweetAta,
              globalAuthority: globalAuth,
              pool: poolAddress,
              usersForLike: userForLikeAddress,
              poolAta: poolAta,
              userAta: userAta,
              poolMint: mintAddress,
              // poolMint: new PublicKey("So11111111111111111111111111111111111111112"),
              // systemProgram: SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
              // rent: SYSVAR_RENT_PUBKEY,
            },
            signers: [oldWallet],
            instructions,
          }
        );
        console.log(tx, "tx");
        res.send({
          msg: "tweet liked",
          YourWallet: userPublicKey.toString(),
          tx: tx,
          type: "success",
        });
        return;
      }
      if (number === 2) {
        const tx = await program.rpc.retweet(
          globalBump,
          projectName,
          tweetId,
          new anchor.BN(amount),
          {
            accounts: {
              user: userPublicKey,
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
            signers: [oldWallet],
            instructions,
          }
        );
        console.log(tx, "tx");
        res.send({
          msg: "tweet retweeted",
          YourWallet: userPublicKey.toString(),
          tx: tx,
          type: "success",
        });
        return;
      }
      if (number === 3) {
        const tx = await program.rpc.commentTweet(
          globalBump,
          projectName,
          tweetId,
          new anchor.BN(amount),
          {
            accounts: {
              user: userPublicKey,
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
            signers: [oldWallet],
            instructions,
          }
        );
        console.log(tx, "tx");
        res.send({
          msg: "commented on tweet",
          YourWallet: userPublicKey.toString(),
          tx: tx,
          type: "success",
        });
        return;
      }
    } else {
      console.log("Client wallet not found");
    }
  } catch (e) {
    console.log(e.message, " err-in createUserController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = {
  createWallet,
  airDrop,
  initializeUserPool,
  tweetAction,
  createTweet,
  getWallet,
};
