import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import useStatesFunc from "../../../../hooks/useStatesFunc";
import useDispatchFunc from "../../../../hooks/useDispatchFunc";

import CreateInvoiceApi from "../../../../apis/private/Invoice/CreateInvoiceApi";

import MiniSpinner from "../../../../helpers/MiniSpinner";
import Loader from "../../../../helpers/Loader";

import NothingToShow from "../../Others/NothingToShow";
import { ADMIN, MANAGER } from "../../../../helpers/UserRoles";
import useUserFunc from "../../../../hooks/useUserFunc";
import {
  Tooltip,
  FormGroup,
  Switch,
  FormControlLabel,
  FormControl,
  RadioGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import {
  Keypair,
  Transaction,
  Connection,
  PublicKey,
  clusterApiUrl,
  SystemProgram,
} from "@solana/web3.js";
import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import * as bs58 from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";
import AddPool from "./AddPool";
import ReadAllInvoices from "./ReadAllInvoices";
import AddTweet from "./AddTweet";

const CreateInvoice = ({ auth }) => {
  const [value, setValue] = React.useState("mention");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (value === "mention") {
      setIsRaid(false);
    } else {
      setIsRaid(true);
    }
  };

  const { connect, publicKey } = useWallet();
  const initialState = {
    projectName: "",
    projectTwitterUsername: "",
    discordForProjectContact: "",
    mintCreatorAddress: "",
    numberOfNft: "",
    imageUrl: "",
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const [stateValues, setStateValues] = useState(initialState);
  const [isRaid, setIsRaid] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [ProjectID, setProjectID] = useState();
  const [poolID, setPoolID] = useState();
  const [ProjectName, setProjectName] = useState();
  const [ispoolSuccessful, setpoolSuccessfully] = useState(false);
  const [istweetSuccessful, settweetSuccessfully] = useState(false);
  const [SolAmount, setSolAmount] = useState();
  const [SplToken, setSplToken] = useState();

  const [steps, setSteps] = useState([
    {
      label: "Step 1",
    },
    {
      label: "Step 2",
    },
    {
      label: "Step 3",
    },
    {
      label: "Step 4",
    },
    {
      label: "Step 5",
    },
  ]);

  const [{ token, loading }] = useStatesFunc();
  const [dispatch] = useDispatchFunc();
  const navigate = useNavigate();
  const [, , checkUserAccess] = useUserFunc();

  const solConnection = new Connection(clusterApiUrl("mainnet-beta"));
  useEffect(() => {
    if (isRaid) {
      setSteps([
        {
          label: "Select Tweet or Raid ",
        },
        {
          label: "Set Up Project",
        },

        {
          label: "Set up Tweet To Earn Pool",
        },
        {
          label: "Add Tweet URL",
        },
        {
          label: "Preview",
        },
      ]);
    } else {
      setSteps([
        {
          label: "Select Tweet or Raid ",
        },
        {
          label: "Set Up Project",
        },

        {
          label: "Set up Tweet To Earn Pool",
        },

        {
          label: "Preview",
        },
      ]);
    }
  }, [isRaid]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (!checkUserAccess([ADMIN, MANAGER])) {
    toast.warning("You cant access");
    return (
      <>
        <NothingToShow />
      </>
    );
  }
  const SubmitForm = async (ev) => {
    ev.preventDefault();
    dispatch({ type: "loadingStart" });
    let body = {
      userId: auth?.userId,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_SERVERURL}/wallet/new`,
      body,
      {
        headers: {
          Authorization: `BEARER ${token}`,
        },
      }
    );
    if (res.data.type === "success") {
      const {
        projectName,
        discordForProjectContact,
        projectTwitterUsername,
        mintCreatorAddress,
        numberOfNft,
        imageUrl,
      } = stateValues;

      if (!projectName || !projectTwitterUsername) {
        toast.warning("No empty values allowed");
        dispatch({ type: "loadingStop" });

        return;
      }

      const body = {
        projectName,
        discordForProjectContact,
        projectTwitterUsername,
        mintCreatorAddress,
        numberOfNft,
        isRaid,
        imageUrl,
      };
      const { data } = await CreateInvoiceApi(body, token);
      console.log(data?.createdInvoice?.projectName, "pooldataID");
      setProjectID(data?.createdInvoice?._id);
      setProjectName(data?.createdInvoice?.projectName);
      dispatch({ type: "loadingStop" });

      if (data.type === "success") {
        toast.success(data.msg);
        setIsSuccessful(true);
        // navigate("/app/invoice/readAll");
      } else {
        toast.error(data.msg);
        dispatch({ type: "loadingStop" });
      }
    } else {
      toast.error("Something went wrong");
      dispatch({ type: "loadingStop" });
    }
  };
  // return (
  //   <>
  //     <div
  //       className="container my-5 p-3"
  //       style={{ background: "#2C2C2E", borderRadius: '19.5591px' }}
  //     >
  //       <FormGroup>
  //         <FormControlLabel
  //           className="text-white"
  //           control={
  //             <Switch
  //               checked={isRaid}
  //               onChange={(e) => {
  //                 setIsRaid(e.target.checked);
  //               }}
  //             />
  //           }
  //           label="Raid"
  //         />
  //       </FormGroup>
  //       <form className="p-md-3 text-white">
  //         {/* invoiceLogo */}
  //         <div className="mb-3">
  //           <label className="form-label">Project Name</label>
  //           <input
  //             type="text"
  //             id="tweetUrl"
  //             placeholder="Project Name"
  //             className="form-control"
  //             value={stateValues.tweetUrl}
  //             onChange={(e) =>
  //               setStateValues((prev) => ({
  //                 ...prev,
  //                 projectName: e.target.value,
  //               }))
  //             }
  //           />
  //         </div>

  //         <div className="mb-3">
  //           <label className="form-label">Project Twitter Username</label>
  //           <Tooltip
  //             title="Enter Twitter username without '@' sign, and without spaces."
  //             placement="top"
  //           >
  //             <input
  //               type="text"
  //               id="tweetUrl"
  //               placeholder="Project Twitter Username"
  //               className="form-control"
  //               value={stateValues.projectTwitterUsername}
  //               onChange={(e) =>
  //                 setStateValues((prev) => ({
  //                   ...prev,
  //                   projectTwitterUsername: e.target.value,
  //                 }))
  //               }
  //             />
  //           </Tooltip>
  //         </div>

  //         <div className="mb-3">
  //           <label className="form-label" htmlFor="timeToclaim">
  //             Discord For Project Contact
  //           </label>
  //           <input
  //             type="text"
  //             id="timeToclaim"
  //             placeholder="Discord For Project Contact"
  //             className="form-control"
  //             value={stateValues.discordForProjectContact}
  //             onChange={(e) =>
  //               setStateValues((prev) => ({
  //                 ...prev,
  //                 discordForProjectContact: e.target.value,
  //               }))
  //             }
  //           />
  //         </div>

  //         <div className="mb-3">
  //           <label className="form-label">Creator Address For mint</label>
  //           <input
  //             type="text"
  //             id="tweetUrl"
  //             placeholder="Address"
  //             className="form-control"
  //             value={stateValues.mintCreatorAddress}
  //             onChange={(e) =>
  //               setStateValues((prev) => ({
  //                 ...prev,
  //                 mintCreatorAddress: e.target.value,
  //               }))
  //             }
  //           />
  //         </div>

  //         <div className="mb-3">
  //           <label className="form-label">Number of Nfts Required</label>
  //           <input
  //             type="text"
  //             id="tweetUrl"
  //             placeholder="Require Number Of Nfts"
  //             className="form-control"
  //             value={stateValues.numberOfNft}
  //             onChange={(e) =>
  //               setStateValues((prev) => ({
  //                 ...prev,
  //                 numberOfNft: e.target.value,
  //               }))
  //             }
  //           />
  //         </div>

  //         {/* here btns */}
  //         <div className="mt-5 mb-3 col">
  //           {loading && (
  //             <>
  //               <MiniSpinner />
  //             </>
  //           )}

  //           <button
  //           style={{borderRadius: '19.5591px'}}
  //             className="btn btn-dark border-dark text-white w-100"
  //             type="button"
  //             onClick={(ev) => SubmitForm(ev)}
  //           >
  //             Submit
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </>
  // );

  // export default function VerticalLinearStepper() {

  const handleNext = () => {
    if (!isSuccessful && activeStep == 1) {
      // if (false) {
      toast.error("Submit form first");
      return;
    }
    if (!ispoolSuccessful && activeStep == 3) {
      // if (false) {
      toast.error("Submit form first");
      return;
    }
    if (!istweetSuccessful && activeStep == 4) {
      // if (false) {
      alert("Add Tweet Url");
      return;
    }

    // }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open("https://phantom.app/", "_blank");
  };

  const handleTransferSol = async () => {
    if (SolAmount) {
      let provider = getProvider();
      let tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            "1GtGo1TpFtHjHmDAL5KtwsRL1XDfhQTVvZv9AaRDE4C"
          ),
          lamports: SolAmount * 1000000,
        })
      );
      tx.recentBlockhash = (await solConnection.getLatestBlockhash()).blockhash;
      tx.feePayer = publicKey;
      const { signature } = await provider.signAndSendTransaction(tx);
      await solConnection.getSignatureStatus(signature);
    } else {
      toast.error("Add Sols Amount");
    }
  };

  const handleTransferSpl = async () => {
    if (SplToken) {
      let senderAta = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        new PublicKey("TomsErt7q2wY3mUzMAJ8mU6pDNbxyTHA5gS44mPSfxm"),
        publicKey
      );

      let desAta = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        new PublicKey("TomsErt7q2wY3mUzMAJ8mU6pDNbxyTHA5gS44mPSfxm"),
        new PublicKey("1GtGo1TpFtHjHmDAL5KtwsRL1XDfhQTVvZv9AaRDE4C")
      );
      console.log(senderAta.toString(), "sender");
      console.log(desAta.toString(), "des");
      let provider = getProvider();
      let tx = new Transaction().add(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          senderAta,
          desAta,
          publicKey,
          [],
          SplToken
        )
      );
      tx.recentBlockhash = (await solConnection.getLatestBlockhash()).blockhash;
      tx.feePayer = publicKey;
      const { signature } = await provider.signAndSendTransaction(tx);
      await solConnection.getSignatureStatus(signature);
    } else {
      toast.error("Add Spl Amount");
    }
  };
  const handlerPreview = () => {
    console.log("preview working");
    if (ProjectName) {
      console.log("projectname", ProjectName);
      navigate(`/projects/${ProjectName}`);
    }
  };

  return (
    <Box sx={{ maxWidth: "85%", margin: "auto" }}>
      <Typography color="white" width="100%" pb={5}>
        {" "}
        <span>
          {" "}
          <Typography fontWeight="bold">
            <u>Note</u>{" "}
          </Typography>
        </span>{" "}
        <span style={{ fontWeight: "bold" }}>• </span> Please avoid creating
        projects with same name <br />
        <span style={{ fontWeight: "bold" }}>• </span> Only one pool can be
        added with a token at a time for e.g XYZ token can be used once in a
        project. If you want to create another pool for XYZ token, you'd have to
        create another project.
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <Typography>
              <StepLabel
              // optional={
              //   index === 5 ? (
              //     <Typography variant="caption" sx={{ color: "white" }}>
              //       Last step
              //     </Typography>
              //   ) : null
              // }
              >
                <Typography variant="caption" sx={{ color: "white" }}>
                  {step.label}
                </Typography>
              </StepLabel>
            </Typography>

            <StepContent>
              {index === 0 ? (
                <div
                  className="container my-5 p-3 border border-1 border-info rounded-3"
                  style={
                    isSuccessful
                      ? {
                          maxWidth: "85%",
                          margin: "auto",
                          pointerEvents: "none",
                        }
                      : { maxWidth: "85%", margin: "auto" }
                  }
                >
                  <FormGroup sx={{ width: "85%", margin: "auto" }}>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          paddingX: "28px",
                          color: "white",
                        }}
                      >
                        {" "}
                      </Typography>
                      <Typography>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                            row
                            sx={{
                              display: "flex",
                              color: "white",
                              fontSize: "50px",
                            }}
                          >
                            <FormControlLabel
                              value="mention"
                              control={<Radio />}
                              label="Mention"
                            />
                            <FormControlLabel
                              value="raid"
                              control={<Radio />}
                              label="Raid"
                            />
                          </RadioGroup>
                        </FormControl>

                        {/* <FormControlLabel
                          className="text-white"
                          control={
                            <Switch
                              checked={isRaid}
                              onChange={(e) => {
                                setIsRaid(e.target.checked);
                              }}
                            />
                          }
                        /> */}
                      </Typography>
                      <Typography
                        sx={{
                          // paddingX: "10px",
                          color: "white",
                        }}
                      >
                        {" "}
                      </Typography>
                    </Typography>
                  </FormGroup>
                </div>
              ) : index === 1 ? (
                <>
                  <div
                    className="container my-5 p-3 border border-1 border-info rounded-3"
                    style={
                      isSuccessful
                        ? {
                            maxWidth: "85%",
                            margin: "auto",
                            pointerEvents: "none",
                          }
                        : { maxWidth: "85%", margin: "auto" }
                    }
                  >
                    <Typography>
                      <form disabled className="p-md-3 text-white">
                        {/* invoiceLogo */}
                        <div className="mb-3">
                          <label className="form-label">Project Name *</label>
                          <input
                            type="text"
                            id="tweetUrl"
                            placeholder="Project Name"
                            className="form-control"
                            value={stateValues.tweetUrl}
                            onChange={(e) =>
                              setStateValues((prev) => ({
                                ...prev,
                                projectName: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            Project Twitter Username *
                          </label>
                          <Tooltip
                            title="Enter Twitter username without '@' sign, and without spaces."
                            placement="top"
                          >
                            <input
                              type="text"
                              id="tweetUrl"
                              placeholder="Project Twitter Username"
                              className="form-control"
                              value={stateValues.projectTwitterUsername}
                              onChange={(e) =>
                                setStateValues((prev) => ({
                                  ...prev,
                                  projectTwitterUsername: e.target.value,
                                }))
                              }
                            />
                          </Tooltip>
                        </div>

                        <div className="mb-3">
                          <label className="form-label" htmlFor="timeToclaim">
                            Discord For Project Contact (optional)
                          </label>
                          <input
                            type="text"
                            id="timeToclaim"
                            placeholder="Discord For Project Contact"
                            className="form-control"
                            value={stateValues.discordForProjectContact}
                            onChange={(e) =>
                              setStateValues((prev) => ({
                                ...prev,
                                discordForProjectContact: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            Creator Address For mint (optional)
                          </label>
                          <input
                            type="text"
                            id="tweetUrl"
                            placeholder="Address"
                            className="form-control"
                            value={stateValues.mintCreatorAddress}
                            onChange={(e) =>
                              setStateValues((prev) => ({
                                ...prev,
                                mintCreatorAddress: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label">
                            Number of Nfts Required (optional)
                          </label>
                          <input
                            type="text"
                            id="tweetUrl"
                            placeholder="Require Number Of Nfts"
                            className="form-control"
                            value={stateValues.numberOfNft}
                            onChange={(e) =>
                              setStateValues((prev) => ({
                                ...prev,
                                numberOfNft: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Image Url</label>
                          <input
                            type="text"
                            id="image"
                            placeholder="image url"
                            className="form-control"
                            value={stateValues.imageUrl}
                            onChange={(e) =>
                              setStateValues((prev) => ({
                                ...prev,
                                imageUrl: e.target.value,
                              }))
                            }
                          />
                        </div>
                        {/* here btns */}
                        <div className="mt-5 mb-3 col">
                          {loading && (
                            <>
                              <MiniSpinner />
                            </>
                          )}

                          <button
                            style={{ borderRadius: "19.5591px" }}
                            className="btn btn-dark border-dark text-white w-100"
                            type="button"
                            onClick={(ev) => SubmitForm(ev)}
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </Typography>
                  </div>
                </>
              ) : // ) : isSuccessful && index === 2 ? (
              index === 7 ? (
                <>
                  <div
                    className="container my-5 p-3 border border-1 border-info rounded-3"
                    style={{ maxWidth: "85%", margin: "auto" }}
                  >
                    <Typography>
                      <form disabled className="p-md-3 text-white">
                        {/* invoiceLogo */}
                        <div className="mb-3">
                          <label className="form-label">Add Sols Amount</label>
                          <input
                            type="text"
                            id="tweetUrl"
                            // placeholder="Project Name"
                            className="form-control"
                            value={SolAmount}
                            pattern="[0-9]*"
                            onChange={(e) =>
                              setSolAmount((v) =>
                                e.target.validity.valid ? e.target.value : v
                              )
                            }
                            // onChange={(e) => setSolAmount(e.target.value)}
                          />
                        </div>
                        <Button
                          onClick={handleTransferSol}
                          sx={{
                            backgroundColor: "primary",
                            marginBottom: "20px",
                          }}
                          variant="contained"
                        >
                          Transfer Sols
                        </Button>

                        <div className="mb-3">
                          <label className="form-label">
                            Add Spl Token Amount
                          </label>
                          <Tooltip
                            // title="Enter Twitter username without '@' sign, and without spaces."
                            placement="top"
                          >
                            <input
                              type="text"
                              id="tweetUrl"
                              // placeholder="Project Twitter Username"
                              className="form-control"
                              value={SplToken}
                              pattern="[0-9]*"
                              // onChange={(e) => setSplToken(e.target.value)}
                              onChange={(e) =>
                                setSplToken((v) =>
                                  e.target.validity.valid ? e.target.value : v
                                )
                              }
                            />
                          </Tooltip>
                        </div>
                        <Button variant="contained" onClick={handleTransferSpl}>
                          Transfer SPL
                        </Button>
                      </form>
                    </Typography>
                  </div>
                </>
              ) : index === 2 ? (
                <>
                  <Typography
                    sx={
                      ispoolSuccessful
                        ? {
                            pointerEvents: "none",
                            width: "85%",
                            margin: "auto",
                          }
                        : { width: "85%", margin: "auto" }
                    }
                  >
                    {/* <ReadAllInvoices /> */}
                    {/* <ReadAllInvoices /> */}
                    {ProjectID && (
                      <AddPool
                        projectId={ProjectID}
                        setPoolID={setPoolID}
                        setpoolSuccessfully={setpoolSuccessfully}
                      />
                    )}
                  </Typography>
                </>
              ) : isRaid && index === 3 ? (
                <>
                  <Typography
                    sx={
                      istweetSuccessful
                        ? {
                            width: "85%",
                            margin: "auto",
                            pointerEvents: "none",
                          }
                        : { width: "85%", margin: "auto" }
                    }
                  >
                    {poolID && (
                      <AddTweet
                        poolID={poolID}
                        settweetSuccessfully={settweetSuccessfully}
                      />
                    )}
                  </Typography>
                </>
              ) : !isRaid && index === 4 ? (
                <>
                  <div
                    className="container my-5 p-3 border border-1 border-info rounded-3"
                    style={{ maxWidth: "85%", margin: "auto" }}
                  >
                    <Button variant="contained" onClick={handlerPreview}>
                      Preview
                    </Button>
                  </div>
                </>
              ) : index === 3 ? (
                <>
                  <div
                    className="container my-5 p-3 border border-1 border-info rounded-3"
                    style={{ maxWidth: "85%", margin: "auto" }}
                  >
                    <Button variant="contained" onClick={handlerPreview}>
                      Preview
                    </Button>
                  </div>
                </>
              ) : null}

              <Box sx={{ width: "80%", margin: "auto" }}>
                <div sx={{}}>
                  {index === steps.length - 1 ? (
                    ""
                  ) : (
                    <Button variant="contained" onClick={handleNext}>
                      Continue
                    </Button>
                  )}
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(CreateInvoice);
