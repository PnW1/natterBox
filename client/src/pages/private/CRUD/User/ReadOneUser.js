import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../../../helpers/Loader";

import useDispatchFunc from "../../../../hooks/useDispatchFunc";
import useStatesFunc from "../../../../hooks/useStatesFunc";

import GetOneUserApi from "../../../../apis/private/User/GetOneUserApi";

import { ADMIN } from "../../../../helpers/UserRoles";

import NothingToShow from "../../Others/NothingToShow";
import useUserFunc from "../../../../hooks/useUserFunc";

const ReadOneUser = () => {
  const [state, setState] = useState();
  const [{ token, loading }] = useStatesFunc();
  const [dispatch] = useDispatchFunc();
  const { id } = useParams();
  const navigate = useNavigate();
  const [, , checkUserAccess] = useUserFunc();

  useEffect(() => {
    (async () => {
      dispatch({ type: "loadingStart" });
      const { data } = await GetOneUserApi(id, token);
      dispatch({ type: "loadingStop" });
      if (data.type === "success") {
        toast.success(data.msg);
        setState(data.userFound);
      } else {
        toast.error(data.msg);
      }
    })();
  }, [dispatch, id, token]);

  if (!checkUserAccess([ADMIN])) {
    toast.warning("You cant access");
    return (
      <>
        <NothingToShow />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (!state) {
    return (
      <>
        <div className="p-5 my-3 card bg-success d-flex justify-content-center">
          <h1 className="display-1 p-5">Nothing to Show You...</h1>
        </div>
      </>
    );
  }

  return (
    <div className="col p-5" style={{background: '#2C2C2E',
    boxShadow: '11.7355px 11.7355px 29.3386px rgba(0, 0, 0, 0.5)',
    borderRadius: '19.5591px'}}>
      <div className="card" style={{background: '#2C2C2E', boxShadow: '11.7355px 11.7355px 29.3386px rgba(0, 0, 0, 0.5)',}}>
        <div>
          <table className="table fw-bold text-white">
            <thead>
              <tr>
                <th>PublicKey </th>
                <td className="d-none d-md-table-cell">:</td>
                <td>{state && state.publicKey}</td>
              </tr>
              <tr>
                <th>Role </th>
                <td className="d-none d-md-table-cell">:</td>
                <td>{state && state.role}</td>
              </tr>
              <tr>
                <th>Id Verified </th>
                <td className="d-none d-md-table-cell">:</td>
                <td>{state && state.isVerified ? "true" : "false"}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div>
          <div className="d-flex flex-column flex-md-row ms-auto justify-content-evenly align-content-center row p-md-5 py-2">
            <div className="col-6">
              <button
                className="btn  text-white w-100 my-2"
                onClick={() => navigate(`/app/user/update/${id}`)}
              >
                Update
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn  text-white w-100 my-2"
                onClick={() => navigate(`/app/user/delete/${id}`)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOneUser;
