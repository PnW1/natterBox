import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useDispatchFunc from "../../../../hooks/useDispatchFunc";
import useStatesFunc from "../../../../hooks/useStatesFunc";

import DeleteInvoiceApi from "../../../../apis/private/Invoice/DeleteInvoicePoolApi";

import Loader from "../../../../helpers/Loader";

import NothingToShow from "../../Others/NothingToShow";
import { ADMIN, MANAGER } from "../../../../helpers/UserRoles";
import useUserFunc from "../../../../hooks/useUserFunc";

const DeleteInvoice = () => {
  const [{ loading, token }] = useStatesFunc();
  const [dispatch] = useDispatchFunc();
  const { id } = useParams();
  const navigate = useNavigate();
  const [, , checkUserAccess] = useUserFunc();

  useEffect(() => {
    (async () => {
      dispatch({ type: "loadingStart" });
      const { data } = await DeleteInvoiceApi(id, token);
      dispatch({ type: "loadingStop" });
      if (data.type === "success") {
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
        navigate(-1);
      }
    })();
  }, [dispatch, id, navigate, token]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (!checkUserAccess([ADMIN, MANAGER])) {
    toast.warning("You cant have access");
    return (
      <>
        <NothingToShow />
      </>
    );
  }

  return (
    <div>
      <div className="text-center">
        <button
          className="btn btn-info border-info text-white m-auto"
          onClick={() => {
            navigate(-2);
          }}
        >
          Click to navigate
        </button>
      </div>
      <div className="p-5 my-3 card bg-light border border-1 border-info rounded-3 d-flex justify-content-center">
        <h1 className="display-1 p-5">Successfully Pool Deleted...</h1>
      </div>
    </div>
  );
};

export default DeleteInvoice;
