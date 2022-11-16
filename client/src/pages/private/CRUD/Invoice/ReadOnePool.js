import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import axios from "axios";

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

import InvoicePoolFetchDataFunc from "../../../../apis/public/others/InvoicePoolFetchDataFunc";

import Loader from "../../../../helpers/Loader";

import useDispatchFunc from "../../../../hooks/useDispatchFunc";
import useStatesFunc from "../../../../hooks/useStatesFunc";
import IDL from "../../components/twitter_program.json";
import IDLFORRAID from "../../components/twitter_program_for_raid.json";

const ReadOneInvoice = ({ auth }) => {
  const { wallet, connect, sendTransaction, connecting, publicKey } =
    useWallet();
  const { connection } = useConnection();

  const [isRaid, setIsRaid] = useState();
  const [invoiceDataWithSpecificPool, setInvoiceDataWithSpecificPool] =
    useState();
  const [splTokenForFundPool, setSplTokenForFundPool] = useState();
  const [projectName, setProjectName] = useState();
  const [amount, setAmount] = useState(1);

  const [dispatch] = useDispatchFunc();
  const [{ token, loading }] = useStatesFunc();
  const { id } = useParams();
  const navigate = useNavigate();

  // const solConnection = new web3.Connection(
  //   web3.clusterApiUrl("devnet"),
  //   "processed"
  // );

  const solConnection = new web3.Connection(
    web3.clusterApiUrl("mainnet-beta"),
    "processed"
  );
  let cloneWindow = window;
  let provider = new anchor.Provider(
    solConnection,
    cloneWindow["solana"],
    anchor.Provider.defaultOptions()
  );

  var program;
  if (isRaid) {
    program = new anchor.Program(
      IDLFORRAID,
      "5UR1VYhWxH9iy5C7mdQWDztgDHLeGZoSyEjye4vzHcjs",
      provider
    );
  } else {
    program = new anchor.Program(
      IDL,
      "6GfMewRfdC6ArLcg2oNbwq9mfE87UorRYRvGJApbVGrk",
      provider
    );
  }
  useEffect(() => {
    const getinvoiceData = async () => {
      dispatch({ type: "loadingStart" });

      // this is for Details esssential for invoice
      const { data } = await InvoicePoolFetchDataFunc(id);
      setIsRaid(data?.invoiceFound[0]?.isRaid);
      setProjectName(data?.invoiceFound[0]?.projectName);
      setSplTokenForFundPool(data?.invoiceFound[0]?.pool[0]?.splToken);
      setInvoiceDataWithSpecificPool(data?.invoiceFound);
      dispatch({ type: "loadingStop" });
      if (data.type === "success") {
        toast.success(data.msg);
      } else {
        toast.warning(data.msg);
        navigate(-1);
      }
    };
    getinvoiceData();
  }, [dispatch, id, navigate]);

  const fundUserPoolForRaid = async () => {
    const mintAddress = new PublicKey(splTokenForFundPool);
    if (publicKey) {
      const [globalAuth, globalBump] =
        await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from("global-authority")],
          // new anchor.BN(47).toArrayLike(Buffer)],
          program.programId
        );
      console.log(globalAuth.toString(), "globalAuth");

      const [poolAddress] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("pool"),
          provider.wallet.publicKey.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
        ],
        program.programId
      );
      console.log(poolAddress.toString(), "poolAddress");

      const [poolAta] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("poolAta"),
          provider.wallet.publicKey.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
        ],
        program.programId
      );

      const clientAta = await solConnection.getTokenAccountsByOwner(
        provider.wallet.publicKey,
        { mint: mintAddress }
      );
      console.log(clientAta.value[0].pubkey.toString(), "clientAta");

      try {
        const tx = await program.rpc.fundUserPool(
          projectName,
          new anchor.BN(amount),
          {
            accounts: {
              client: provider.wallet.publicKey,
              pool: poolAddress,
              poolAta: poolAta,
              poolMint: mintAddress,
              clientAta: clientAta.value[0].pubkey,
              tokenProgram: TOKEN_PROGRAM_ID,
            },
          }
        );
        console.log(tx, "tx");
      } catch (err) {
        console.log(err, "err");
      }
    }
  };
  const airDrop = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/reward/${invoiceDataWithSpecificPool[0]?.projectName}/${invoiceDataWithSpecificPool[0]?.pool[0].splToken}/${invoiceDataWithSpecificPool[0]?.invoiceCreater}`,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
    if (res?.data?.reward?.length > 0) {
      var tempArray = [];
      res?.data?.reward?.map((user) => {
        tempArray.push({
          userPublicKey: user.userPublicKey,
          tweetIds: user.tweetId,
          userId: user.userId,
        });
      });

      let body = {
        isRaid,
        usersArray: tempArray,
        rewardToken: splTokenForFundPool,
        projectName: invoiceDataWithSpecificPool[0]?.projectName,
      };
      const resData = await axios.patch(
        `${process.env.REACT_APP_SERVERURL}/reward/updateRewardRecord`,
        body,
        {
          headers: {
            Authorization: `BEARER ${token}`,
          },
        }
      );
      if (resData.data.tx) {
        toast.success(resData.data.msg);
      } else {
        toast.error(resData.data.msg);
      }
      return;
      if (resData.data) {
        let body = {
          usersArray: tempArray,
          isRaid,
          splToken: splTokenForFundPool,
          projectName: invoiceDataWithSpecificPool[0]?.projectName,
        };

        const response = await axios.post(
          `${process.env.REACT_APP_SERVERURL}/wallet/airdrop`,
          body,
          {
            headers: {
              Authorization: `BEARER ${token}`,
            },
          }
        );
        if (response.data.tx) {
          console.log(response.data.tx);
          toast.success("Transfer Successfully");
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("No record found");
    }
  };

  const fundUserPool = async () => {
    const mintAddress = new PublicKey(splTokenForFundPool);
    // const mintAddress = new PublicKey("3pCLx1uK3PVFGQ3siyxurvXXSLijth2prgBEK4cS33XF")
    if (publicKey) {
      const [globalAuth, globalBump] =
        await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from("global-authority")],
          // new anchor.BN(47).toArrayLike(Buffer)],
          program.programId
        );
      console.log(globalAuth.toString(), "globalAuth");

      const [poolAddress] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("pool"),
          provider.wallet.publicKey.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
        ],
        program.programId
      );
      console.log(poolAddress.toString(), "poolAddress");

      const [poolAta] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("poolAta"),
          provider.wallet.publicKey.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
        ],
        program.programId
      );

      let clientAta = (
        await PublicKey.findProgramAddress(
          [
            provider.wallet.publicKey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintAddress.toBuffer(), // mint address
          ],
          ASSOCIATED_TOKEN_PROGRAM_ID
        )
      )[0];
      console.log(clientAta.toString(), "clientAta");

      const userAtaCheck = await solConnection.getTokenAccountsByOwner(
        provider.wallet.publicKey,
        { mint: mintAddress }
      );

      let instructions = [];
      if (userAtaCheck.value.length === 0) {
        if (NATIVE_MINT.toString() === mintAddress.toString()) {
          instructions.push(
            Token.createAssociatedTokenAccountInstruction(
              ASSOCIATED_TOKEN_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              mintAddress,
              clientAta,
              provider.wallet.publicKey,
              provider.wallet.publicKey
            ),
            // Token.createTransferInstruction(TOKEN_PROGRAM_ID, provider.wallet.publicKey, clientAta, provider.wallet.publicKey, [], 100000000)
            SystemProgram.transfer({
              fromPubkey: provider.wallet.publicKey,
              toPubkey: clientAta,
              lamports: 1000000000,
            }),
            // TOKEN_PROGRAM_ID, provider.wallet.publicKey, clientAta, provider.wallet.publicKey, [], 100000000
            // await Token.createWrappedNativeAccount(solConnection, TOKEN_PROGRAM_ID, provider.wallet.publicKey, provider.wallet, 100000000)
            // ,
            Token.createSyncNativeInstruction(TOKEN_PROGRAM_ID, clientAta)
          );
          console.log("wrapped");
        }
      } else {
        if (NATIVE_MINT.toString() === mintAddress.toString()) {
          instructions.push(
            // Token.createTransferInstruction(TOKEN_PROGRAM_ID, provider.wallet.publicKey, clientAta, provider.wallet.publicKey, [], 100000000)
            SystemProgram.transfer({
              fromPubkey: provider.wallet.publicKey,
              toPubkey: clientAta,
              lamports: 1000000000,
            }),
            // TOKEN_PROGRAM_ID, provider.wallet.publicKey, clientAta, provider.wallet.publicKey, [], 100000000
            // await Token.createWrappedNativeAccount(solConnection, TOKEN_PROGRAM_ID, provider.wallet.publicKey, provider.wallet, 100000000)
            // ,
            Token.createSyncNativeInstruction(TOKEN_PROGRAM_ID, clientAta)
          );
        }
      }

      try {
        const tx = await program.rpc.fundUserPool(
          projectName,
          new anchor.BN(10000000),
          {
            accounts: {
              client: provider.wallet.publicKey,
              pool: poolAddress,
              poolAta: poolAta,
              poolMint: mintAddress,
              clientAta: clientAta,
              tokenProgram: TOKEN_PROGRAM_ID,
            },
            instructions,
          }
        );
        console.log(tx, "tx");
      } catch (err) {
        console.log(err, "err");
      }
    }
  };

  const updateUserPoolForRaid = async () => {
    const mintAddress = new PublicKey(
      "3pCLx1uK3PVFGQ3siyxurvXXSLijth2prgBEK4cS33XF"
    );
    const feeAcc = new PublicKey(
      "7VPjjEj7mukgBf9TqpDxivnu7BNH4rdUmSFUpgvpLvf7"
    );
    const startTime = "1234";
    const timeLimit = 59;
    const isPaused = true;
    const isCompleted = true;
    const funds = 10000000000; // 10 SPL
    if (publicKey) {
      const [globalAuth, globalBump] =
        await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from("global-authority")],
          // new anchor.BN(47).toArrayLike(Buffer)],
          program.programId
        );
      console.log(globalAuth.toString(), "globalAuth");

      const [poolAddress] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("pool"),
          provider.wallet.publicKey.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
        ],
        program.programId
      );
      console.log(poolAddress.toString(), "poolAddress");

      const clientAta = await solConnection.getTokenAccountsByOwner(
        provider.wallet.publicKey,
        { mint: mintAddress }
      );
      const [poolAta] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("poolAta"),
          provider.wallet.publicKey.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
        ],
        program.programId
      );
      console.log(clientAta.value[0].pubkey.toString(), "clientAta");
      console.log(poolAta.toString(), "poolAta");

      try {
        const tx = await program.rpc.updateUserPool(
          projectName,
          startTime,
          new anchor.BN(timeLimit),
          isPaused,
          isCompleted,
          {
            accounts: {
              client: provider.wallet.publicKey,
              globalAuthority: globalAuth,
              pool: poolAddress,
              poolAta: poolAta,
              poolMint: mintAddress,
              feeAcc: feeAcc,
              clientAta: clientAta.value[0].pubkey,
              systemProgram: SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
              rent: SYSVAR_RENT_PUBKEY,
            },
          }
        );
        console.log(tx, "tx");
      } catch (err) {
        console.log(err, "err");
      }
    }
  };

  const updateUserPool = async () => {
    const mintAddress = new PublicKey(
      "3pCLx1uK3PVFGQ3siyxurvXXSLijth2prgBEK4cS33XF"
    );
    const feeAcc = new PublicKey(
      "7VPjjEj7mukgBf9TqpDxivnu7BNH4rdUmSFUpgvpLvf7"
    );
    const startTime = "1234";
    const timeLimit = 59;
    const isPaused = true;
    const isCompleted = true;
    const funds = 10000000000; // 10 SPL
    if (publicKey) {
      const [globalAuth, globalBump] =
        await anchor.web3.PublicKey.findProgramAddress(
          [Buffer.from("global-authority")],
          // new anchor.BN(47).toArrayLike(Buffer)],
          program.programId
        );
      console.log(globalAuth.toString(), "globalAuth");

      const [poolAddress] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("pool"),
          provider.wallet.publicKey.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
        ],
        program.programId
      );
      console.log(poolAddress.toString(), "poolAddress");

      const clientAta = await solConnection.getTokenAccountsByOwner(
        provider.wallet.publicKey,
        { mint: mintAddress }
      );
      const [poolAta] = await anchor.web3.PublicKey.findProgramAddress(
        [
          anchor.utils.bytes.utf8.encode("poolAta"),
          provider.wallet.publicKey.toBuffer(),
          mintAddress.toBuffer(),
          Buffer.from(projectName),
        ],
        program.programId
      );
      console.log(clientAta.value[0].pubkey.toString(), "clientAta");
      console.log(poolAta.toString(), "poolAta");

      try {
        const tx = await program.rpc.updateUserPool(
          projectName,
          startTime,
          new anchor.BN(timeLimit),
          isPaused,
          isCompleted,
          {
            accounts: {
              client: provider.wallet.publicKey,
              globalAuthority: globalAuth,
              pool: poolAddress,
              poolAta: poolAta,
              poolMint: mintAddress,
              feeAcc: feeAcc,
              clientAta: clientAta.value[0].pubkey,
              systemProgram: SystemProgram.programId,
              tokenProgram: TOKEN_PROGRAM_ID,
              rent: SYSVAR_RENT_PUBKEY,
            },
          }
        );
        console.log(tx, "tx");
      } catch (err) {
        console.log(err, "err");
      }
    }
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div>
      <div
        className="my-5 container"
        style={{
          background: "#2C2C2E",
          boxShadow: "11.7355px 11.7355px 29.3386px rgba(0, 0, 0, 0.5)",
          borderRadius: "10px",
        }}
      >
        <div className="">
          <div className="display-4 p-3 m-3 text-center text-white project_info">
            Pool Info
          </div>
          <div className="d-flex flex-column flex-md-row ms-auto justify-content-evenly align-content-center row p-md-5 py-2 ">
            {isRaid ? (
              <div className="col-8 col-md-6 m-3">
                <button
                  className="btn btn-info border-info text-white w-100 my-2"
                  onClick={() =>
                    navigate(
                      `/app/invoice/readOne/readAllPool/readOnePool/readAllTweet/${id}`
                    )
                  }
                >
                  Tweets
                </button>
              </div>
            ) : null}
            {isRaid ? (
              <div className="col-8 col-md-6 m-3">
                <button
                  className="btn text-white w-100 my-2"
                  onClick={fundUserPoolForRaid}
                >
                  Subcription
                </button>
              </div>
            ) : (
              <div className="col-8 col-md-6 m-3">
                <button
                  className="btn text-white w-100 my-2"
                  onClick={fundUserPool}
                >
                  Subcription
                </button>
              </div>
            )}
            {isRaid ? null : (
              <>
                <div className="col-8 col-md-6 m-3">
                  <button
                    className="btn text-white w-100 my-2"
                    onClick={fundUserPool}
                  >
                    Fund Pool
                  </button>
                </div>
                <div className="col-8 col-md-6 m-3">
                  <button
                    className="btn text-white w-100 my-2"
                    onClick={airDrop}
                  >
                    Air Drop
                  </button>
                </div>
              </>
            )}

            <div className="col-8 col-md-6 m-3">
              <button
                className="btn  text-white w-100 my-2"
                onClick={() =>
                  navigate(`/app/invoice/readOne/readAllPool/update/${id}`)
                }
              >
                Update Pool
              </button>
            </div>
            <div className="col-8 col-md-6 m-3">
              <button
                className="btn  text-white w-100 my-2"
                onClick={() =>
                  navigate(`/app/invoice/readOne/readAllPool/delete/${id}`)
                }
              >
                Delete Pool
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(ReadOneInvoice);
