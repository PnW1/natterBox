import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import useStatesFunc from "../../../../hooks/useStatesFunc";
import useDispatchFunc from "../../../../hooks/useDispatchFunc";

import UpdateInvoiceApi from "../../../../apis/private/Invoice/UpdateInvoiceApi";

import MiniSpinner from "../../../../helpers/MiniSpinner";
import Loader from "../../../../helpers/Loader";

import {
  useWalletModal,
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import * as anchor from "@project-serum/anchor";
import { web3 } from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  Token,
  NATIVE_MINT,
} from "@solana/spl-token";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY } from "@solana/web3.js";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import IDL from "../../components/twitter_program.json";
import IDLFORRAID from "../../components/twitter_program_for_raid.json";

import NothingToShow from "../../Others/NothingToShow";
import { ADMIN, MANAGER } from "../../../../helpers/UserRoles";
import useUserFunc from "../../../../hooks/useUserFunc";
import { connect } from "react-redux";
import moment from "moment";

//  intialValue = {
//   sellerName,
//   customerName,
//   customerEmail,
//   productName,
//   qty,
//   price,
//   tax,
//   dueDate,
// }
const AddPool = ({ auth, projectId, setPoolID, setpoolSuccessfully }) => {
  const initialState = {
    amount: "",
    startTime: "",
    endTime: "",
    tweetRewards: "",
    rewardFrequency: "day",
    category: ["", "", "", "", "", "", ""],
    splToken: "",
  };
  const { wallet, connect, sendTransaction, connecting, publicKey } =
    useWallet();
  let { id } = useParams();
  if (!id) {
    id = projectId;
    // setflag1(false);
  }
  const [stateValues, setStateValues] = useState(initialState);
  const [projectName, setProjectName] = useState();
  const [isRaid, setIsRaid] = useState(false);
  const [apiError, setApiError] = useState();
  const [flag1, setflag1] = useState(true);
  const [flag, setFlag] = useState(false);

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

  const [{ token, loading }] = useStatesFunc();
  const [dispatch] = useDispatchFunc();
  const navigate = useNavigate();
  const [, , checkUserAccess] = useUserFunc();

  const getProjectDetail = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/api/public/invoice/${id}`
    );
    if (res?.data) {
    }

    if (res?.data?.invoiceFound) {
      setProjectName(res?.data?.invoiceFound?.projectName);
      setIsRaid(res?.data?.invoiceFound?.isRaid);
    } else {
      alert("No Tweet Found");
    }
  };

  useEffect(() => {
    if (id) {
      getProjectDetail();
    }
  }, [id]);
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
    try {
      ev.preventDefault();
      dispatch({ type: "loadingStart" });

      const {
        amount,
        startTime,
        endTime,
        category,
        rewardFrequency,
        splToken,
      } = stateValues;

      var timeLimit = 1;
      if (rewardFrequency === "week") {
        timeLimit = 7;
      } else if (rewardFrequency === "month") {
        timeLimit = 30;
      }
      for (var i = 0; i < category.length; i++) {
        if (category[i] === "") {
          toast.warning("No empty values allowed");
          navigate(0);

          return;
        }
      }

      if (
        (!amount ||
          !startTime ||
          !endTime ||
          category.length !== 7 ||
          !rewardFrequency,
        !splToken || splToken === "OTHER")
      ) {
        toast.warning("No empty values allowed");
        navigate(0);
        return;
      }

      if (isRaid) {
        const body = {
          funds: amount,
          startTime,
          isRaid,
          timeLimit,
          category,
          rewardFrequency,
          splToken,
          projectName,
        };
        const res = await axios.post(
          `${process.env.REACT_APP_SERVERURL}/wallet/initializeUserPool`,
          body,
          {
            headers: {
              Authorization: `BEARER ${token}`,
            },
          }
        );
        if (!res.data.tx) {
          toast.error("Something went wrong");
          return;
        }
      } else {
        const body = {
          funds: amount,
          startTime,
          isRaid,
          timeLimit,
          category,
          rewardFrequency,
          splToken,
          projectName,
        };
        const res = await axios
          .post(
            `${process.env.REACT_APP_SERVERURL}/wallet/initializeUserPool`,
            body,
            {
              headers: {
                Authorization: `BEARER ${token}`,
              },
            }
          )
          .catch((err) => {
            setApiError(err.response.data.msg);
          });
        if (!res.data.tx) {
          toast.error("Something went wrong");
          return;
        }
      }

      const body = {
        pool: {
          amount,
          startTime,
          endTime,
          category,
          rewardFrequency,
          splToken,
        },
      };
      const { data } = await UpdateInvoiceApi(id, body, token);
      dispatch({ type: "loadingStop" });

      if (data.type === "success") {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVERURL}/api/public/invoice/${id}`
        );
        if (projectId) {
          setPoolID(res?.data?.invoiceFound?.pool[0]._id);
          setpoolSuccessfully(true);
        }
        toast.success(data.msg);
        if (!projectId) {
          console.log(id, "coming id");
          navigate(`/app/invoice/readOne/readAllPool/${id}`);
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(apiError);
      dispatch({ type: "loadingStop" });
    }
  };

  const handleChange = (e, position) => {
    let temp = [...stateValues.category];
    temp[position] = e.target.value;
    setStateValues((prev) => ({
      ...prev,
      category: temp,
    }));
  };

  return (
    <>
      <div className="container my-5 p-3 border border-1 border-info rounded-3">
        <form className="p-md-3 text-white">
          <div className="mb-3">
            <label className="form-label">Amount </label>
            <input
              type="text"
              id="amount"
              placeholder="Amount"
              className="form-control"
              value={stateValues.amount}
              onChange={(e) =>
                setStateValues((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
            />
          </div>

          <div className="mb-3 ">
            <label className="form-label" htmlFor="timeToclaim">
              Start Time
            </label>
            <input
              type="datetime-local"
              id="timeToclaim"
              placeholder="Start Time"
              className="form-control"
              value={
                stateValues.startTime
                  ? moment
                      .unix(stateValues.startTime)
                      .format(moment.HTML5_FMT.DATETIME_LOCAL)
                  : moment().format(moment.HTML5_FMT.DATETIME_LOCAL)
              }
              onChange={(event) =>
                setStateValues((prev) => ({
                  ...prev,
                  startTime: moment(event.target.value).unix().toString(),
                }))
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="timeToclaim">
              End Time
            </label>
            <input
              type="datetime-local"
              id="timeToclaim"
              placeholder="Start Time"
              className="form-control"
              value={
                stateValues.endTime
                  ? moment
                      .unix(stateValues.endTime)
                      .format(moment.HTML5_FMT.DATETIME_LOCAL)
                  : moment().format(moment.HTML5_FMT.DATETIME_LOCAL)
              }
              onChange={(event) =>
                setStateValues((prev) => ({
                  ...prev,
                  endTime: moment(event.target.value).unix().toString(),
                }))
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">50-99 Followers</label>
            <input
              type="text"
              id="followers"
              placeholder="Followers"
              className="form-control"
              value={stateValues?.category[0]}
              onChange={(e) => handleChange(e, 0)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">100-299 Followers</label>
            <input
              type="text"
              id="followers"
              placeholder="Followers"
              className="form-control"
              value={stateValues.category[1]}
              onChange={(e) => handleChange(e, 1)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">300-499 Followers</label>
            <input
              type="text"
              id="followers"
              placeholder="Followers"
              className="form-control"
              value={stateValues.category[2]}
              onChange={(e) => handleChange(e, 2)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">500-999 Followers</label>
            <input
              type="text"
              id="followers"
              placeholder="Followers"
              className="form-control"
              value={stateValues.category[3]}
              onChange={(e) => handleChange(e, 3)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">1000-4999 Followers</label>
            <input
              type="text"
              id="followers"
              placeholder="Followers"
              className="form-control"
              value={stateValues.category[4]}
              onChange={(e) => handleChange(e, 4)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">5000-9999 Followers</label>
            <input
              type="text"
              id="followers"
              placeholder="Followers"
              className="form-control"
              value={stateValues.category[5]}
              onChange={(e) => handleChange(e, 5)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">10,000 + Followers</label>
            <input
              type="text"
              id="followers"
              placeholder="Followers"
              className="form-control"
              value={stateValues.category[6]}
              onChange={(e) => handleChange(e, 6)}
            />
          </div>

          <div className="mb-5">
            <label className="form-label" htmlFor="userType">
              Reward Frequency
            </label>
            <select
              className="form-select"
              id="userType"
              required={true}
              value={stateValues.rewardFrequency}
              onChange={(e) =>
                setStateValues((prev) => ({
                  ...prev,
                  rewardFrequency: e.target.value,
                }))
              }
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="form-label" htmlFor="userType">
              Token
            </label>
            <select
              className="form-select"
              id="userType"
              required={true}
              value={!flag ? stateValues.splToken : "OTHER"}
              onChange={(e) => {
                if (e.target.value !== "OTHER") {
                  setFlag(false);
                  setStateValues((prev) => ({
                    ...prev,
                    splToken: e.target.value,
                  }));
                } else {
                  setFlag(true);
                  setStateValues((prev) => ({
                    ...prev,
                    splToken: "",
                  }));
                }
              }}
            >
              <option value="">Select Token</option>
              <option value="So11111111111111111111111111111111111111112">
                SOL
              </option>
              <option value="RkhPCnaMogmgpLWfZX64oejPCDdAnHRkdy2rvGHdE7D">
                LUV
              </option>
              <option value="Ewf86g35EWcr5dyLSunQkCt5pcnR3hY6bnDAPCKcaye">
                FLNT
              </option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>
          {flag ? (
            <div className="mb-3">
              <label className="form-label">Other token address</label>
              <input
                type="text"
                id="splToken"
                placeholder="Address"
                className="form-control"
                value={stateValues.splToken}
                onChange={(e) =>
                  setStateValues((prev) => ({
                    ...prev,
                    splToken: e.target.value,
                  }))
                }
              />
            </div>
          ) : null}

          {/* here btns */}
          <div className="mt-5 mb-3 col">
            {loading && (
              <>
                <MiniSpinner />
              </>
            )}

            <button
              className="btn btn-dark border-dark text-white w-100"
              type="button"
              onClick={(ev) => SubmitForm(ev)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(AddPool);
