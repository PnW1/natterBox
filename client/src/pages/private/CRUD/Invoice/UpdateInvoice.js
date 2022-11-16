import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import GetOneInvoiceApi from "../../../../apis/private/Invoice/GetOneInvoiceApi";
import UpdateInvoiceApi from "../../../../apis/private/Invoice/UpdateInvoiceApi";

import Loader from "../../../../helpers/Loader";

import useDispatchFunc from "../../../../hooks/useDispatchFunc";
import useStatesFunc from "../../../../hooks/useStatesFunc";

import NothingToShow from "../../Others/NothingToShow";
import { ADMIN, MANAGER } from "../../../../helpers/UserRoles";
import useUserFunc from "../../../../hooks/useUserFunc";
import { connect } from "react-redux";

const UpdateInvoice = (props) => {
  const [state, setState] = useState();
  const [dispatch] = useDispatchFunc();
  const [{ loading, token }] = useStatesFunc();
  const { id } = useParams();
  const navigate = useNavigate();
  const [, , checkUserAccess] = useUserFunc();

  useEffect(() => {
    const getinvoiceData = async () => {
      dispatch({ type: "loadingStart" });

      // this is for Details esssential for invoice
      const { data } = await GetOneInvoiceApi(id);
      dispatch({ type: "loadingStop" });
      if (data.type === "success") {
        toast.success(data.msg);
        setState(data.invoiceFound);
      } else {
        toast.warning(data.msg);
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
    if (
      !state.projectName ||
      !state.discordForProjectContact ||
      !state.projectTwitterUsername
    ) {
      toast.error("No empty values allowed");
      return;
    }
    const {
      projectName,
      discordForProjectContact,
      projectTwitterUsername,
      mintCreatorAddress,
      numberOfNft,
    } = state;
    const body = {
      projectName,
      discordForProjectContact,
      projectTwitterUsername,
      mintCreatorAddress,
      numberOfNft,
    };
    const { data } = await UpdateInvoiceApi(id, body, token);

    if (data.type === "success") {
      toast.success(data.msg);
      navigate(-1);
    } else {
      toast.error(data.msg);
    }
  };

  return (
    <>
      {state && (
        <div
          className="container my-5 p-3"
          style={{ background: '#2C2C2E',
            boxShadow: '11.7355px 11.7355px 29.3386px rgba(0, 0, 0, 0.5)',
            borderRadius: '19.5591px' }}
        >
          <form className="p-md-3 text-white project_form">
            <div className="mb-5">
              <label className="form-label" htmlFor="invoiceLogoImg">
                Project Name
              </label>
              <input
                type="text"
                id="tweetUrl"
                placeholder="Project Name"
                className="form-control"
                value={state.projectName || ""}
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
                Project Twitter Username
              </label>
              <input
                type="text"
                id="invoiceLogoImg"
                placeholder="Project Twitter Username"
                className="form-control"
                value={state.projectTwitterUsername || ""}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    discordForProjectContact: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-5">
              <label className="form-label" htmlFor="invoiceLogoImg">
                Discord For Project Contact
              </label>
              <input
                type="text"
                id="invoiceLogoImg"
                placeholder="Discord For Project Contact"
                className="form-control"
                value={state.discordForProjectContact || ""}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    discordForProjectContact: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-5">
              <label className="form-label" htmlFor="invoiceLogoImg">
                Creator Address For mint
              </label>
              <input
                type="text"
                id="invoiceLogoImg"
                placeholder="Discord For Project Contact"
                className="form-control"
                value={state.mintCreatorAddress || ""}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    mintCreatorAddress: e.target.value,
                  }))
                }
              />
            </div>

            <div className="my-5 col">
              <button
                className="btn btn-dark border-dark text-white w-100"
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
