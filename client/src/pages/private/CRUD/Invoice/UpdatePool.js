import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import InvoicePoolFetchDataFunc from "../../../../apis/public/others/InvoicePoolFetchDataFunc";

import UpdateInvoicePoolApi from "../../../../apis/private/Invoice/UpdateInvoicePoolApi";

import Loader from "../../../../helpers/Loader";

import useDispatchFunc from "../../../../hooks/useDispatchFunc";
import useStatesFunc from "../../../../hooks/useStatesFunc";

import NothingToShow from "../../Others/NothingToShow";
import { ADMIN, MANAGER } from "../../../../helpers/UserRoles";
import useUserFunc from "../../../../hooks/useUserFunc";
import { connect } from "react-redux";

const UpdateInvoice = () => {
  const [state, setState] = useState();
  const [flag, setFlag] = useState(false);
  const [dispatch] = useDispatchFunc();
  const [{ loading, token }] = useStatesFunc();
  const { id } = useParams();
  const navigate = useNavigate();
  const [, , checkUserAccess] = useUserFunc();
  console.log(state, "sdjhfjkdshk");
  useEffect(() => {
    const getinvoiceData = async () => {
      dispatch({ type: "loadingStart" });

      // this is for Details esssential for invoice
      const { data } = await InvoicePoolFetchDataFunc(id);
      dispatch({ type: "loadingStop" });
      if (data.type === "success") {
        toast.success(data.msg);
        setState(data?.invoiceFound[0]?.pool[0]);
      } else {
        toast.warning(data?.msg);
        navigate(-1);
      }
    };
    getinvoiceData();
  }, [dispatch, id, navigate]);

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

  const submitForm = async (ev) => {
    ev.preventDefault();
    for (var i = 0; i < state.category.length; i++) {
      if (state.category[i] === "") {
        toast.warning("No empty values allowed");
        navigate(0);

        return;
      }
    }
    if (
      !state.amount ||
      !state.startTime ||
      state.category.length !== 7 ||
      !state.tweetUrl ||
      !state.rewardFrequency ||
      !state.splToken
    ) {
      toast.error("No empty values allowed");
      return;
    }
    const {
      amount,
      difference,
      startTime,
      tweetUrl,
      rewardFrequency,
      category,
      splToken,
    } = state;

    let position = tweetUrl.lastIndexOf("/");
    if (!position) {
      toast.warning("Please enter a valid tweet url");
      navigate(0);
      return;
    }
    let tweetId = tweetUrl.substring(position + 1);
    const body = {
      amount,
      difference,
      startTime,
      tweetUrl,
      tweetId,
      category,
      rewardFrequency,
      splToken,
    };
    const { data } = await UpdateInvoicePoolApi(id, body, token);

    if (data.type === "success") {
      toast.success(data.msg);
      navigate(-2);
    } else {
      toast.error(data.msg);
    }
  };

  const handleChange = (e, position) => {
    let temp = [...state.category];
    temp[position] = e.target.value;
    setState((prev) => ({
      ...prev,
      category: temp,
    }));
  };

  console.log(state, "hgj");

  return (
    <>
      {state && (
        <div className="container my-5 p-3 border border-1 border-info rounded-3">
          <form className="p-md-3 ">
            <div className="mb-5">
              <label className="form-label" htmlFor="invoiceLogoImg">
                Amount
              </label>
              <input
                type="text"
                id="amount"
                placeholder="Amount"
                className="form-control"
                value={state.amount || ""}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    projectName: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-5">
              <label className="form-label" htmlFor="invoiceLogoImg">
                Start Time
              </label>
              <input
                type="text"
                id="startTime"
                placeholder="Start Time"
                className="form-control"
                value={state.startTime || ""}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-5">
              <label className="form-label" htmlFor="invoiceLogoImg">
                Tweet Url
              </label>
              <input
                type="text"
                id="tweeturl"
                placeholder="Tweet Url"
                className="form-control"
                value={state.tweetUrl || ""}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    tweetUrl: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">50-99 Followers</label>
              <input
                type="text"
                id="tweetUrl"
                placeholder="Followers"
                className="form-control"
                value={state?.category[0]}
                onChange={(e) => handleChange(e, 0)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">100-299 Followers</label>
              <input
                type="text"
                id="tweetUrl"
                placeholder="Followers"
                className="form-control"
                value={state.category[1]}
                onChange={(e) => handleChange(e, 1)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">300-499 Followers</label>
              <input
                type="text"
                id="tweetUrl"
                placeholder="Followers"
                className="form-control"
                value={state.category[2]}
                onChange={(e) => handleChange(e, 2)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">500-999 Followers</label>
              <input
                type="text"
                id="tweetUrl"
                placeholder="Followers"
                className="form-control"
                value={state.category[3]}
                onChange={(e) => handleChange(e, 3)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">1000-4999 Followers</label>
              <input
                type="text"
                id="tweetUrl"
                placeholder="Followers"
                className="form-control"
                value={state.category[4]}
                onChange={(e) => handleChange(e, 4)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">5000-9999 Followers</label>
              <input
                type="text"
                id="tweetUrl"
                placeholder="Followers"
                className="form-control"
                value={state.category[5]}
                onChange={(e) => handleChange(e, 5)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">10,000 + Followers</label>
              <input
                type="text"
                id="tweetUrl"
                placeholder="Followers"
                className="form-control"
                value={state.category[6]}
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
                value={state.rewardFrequency}
                onChange={(e) =>
                  setState((prev) => ({
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
                value={!flag ? state.splToken : "OTHER"}
                onChange={(e) => {
                  if (e.target.value !== "OTHER") {
                    setFlag(false);
                    setState((prev) => ({
                      ...prev,
                      splToken: e.target.value,
                    }));
                  } else {
                    setFlag(true);
                    setState((prev) => ({
                      ...prev,
                      splToken: "",
                    }));
                  }
                }}
              >
                <option value="So11111111111111111111111111111111111111112">
                  SOL
                </option>
                <option value="RkhPCnaMogmgpLWfZX64oejPCDdAnHRkdy2rvGHdE7D1">
                  LUV
                </option>
                <option value="RkhPCnaMogmgpLWfZX64oejPCDdAnHRkdy2rvGHdE7D2">
                  DUST
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
                  value={state.splTokens}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      splToken: e.target.value,
                    }))
                  }
                />
              </div>
            ) : null}

            <div className="my-5  col">
              <button
                className="btn btn-info border-info text-white w-100"
                type="button"
                onClick={(ev) => submitForm(ev)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(UpdateInvoice);
