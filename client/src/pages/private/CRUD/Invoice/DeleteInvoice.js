import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useDispatchFunc from "../../../../hooks/useDispatchFunc";
import useStatesFunc from "../../../../hooks/useStatesFunc";

import DeleteInvoiceApi from "../../../../apis/private/Invoice/DeleteInvoiceApi";

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
          className="btn btn-info text-white border-info ms-auto"
          onClick={() => {
            navigate(-2);
          }}
        >
          Click to navigate
        </button>
      </div>
      <div className="p-5 my-3 card border rounded-3 d-flex justify-content-center" style={{background:"#333333"}}>
        <h5 className="display-1 p-5 text-white text-center">Successfully Project Deleted...</h5>
      </div>
    </div>
  );
};

export default DeleteInvoice;
