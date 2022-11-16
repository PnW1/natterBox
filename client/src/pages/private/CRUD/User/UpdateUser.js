import React, { useState, useEffect } from "react";

import useDispatchFunc from "../../../../hooks/useDispatchFunc";
import useStatesFunc from "../../../../hooks/useStatesFunc";

import GetOneUserApi from "../../../../apis/private/User/GetOneUserApi";
import UpdateUserApi from "../../../../apis/private/User/UpdateUserApi";

import MiniSpinner from "../../../../helpers/MiniSpinner";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../helpers/Loader";

import useUserFunc from "../../../../hooks/useUserFunc";
import NothingToShow from "../../Others/NothingToShow";
import { ADMIN } from "../../../../helpers/UserRoles";

// id as params
//data =  { email, name, userType }
const UpdateUser = () => {
  // const initialValue = {
  //   name: data.name,
  //   email: data.email,
  //   password: data.password,
  //   userType: data.userType,
  // };

  const [state, setState] = useState(undefined);
  const [{ loading, token }] = useStatesFunc();
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

  const SubmitForm = async (ev) => {
    ev.preventDefault();
    dispatch({ type: "loadingStart" });
    const { publicKey, isVerified, role } = state;

    const body = { publicKey, isVerified, userType: role };
    const authorizationToken = token ? token : "";
    const response = await UpdateUserApi(id, body, authorizationToken);

    dispatch({ type: "loadingStop" });

    if (response.data.type === "success") {
      toast.success(response.data.msg);
      navigate(-1);
    } else {
      toast.error(response.data.msg);
    }
  };

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (!state || state.length < -1 || state === "") {
    return (
      <>
        <div className="p-5 my-3 card bg-success d-flex justify-content-center">
          <h1 className="display-1 p-5">Nothing to Show You...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      {state && (
        <div className="container my-5 p-3 border border-1 border-info rounded-3">
          <form className="p-md-3 ">
            <div className="mb-3">
              <label className="form-label" htmlFor="userName">
                Public Key
              </label>
              <input
                type="text"
                id="userName"
                placeholder="User Name"
                className="form-control"
                required={true}
                value={state.publicKey}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, publicKey: e.target.value }))
                }
              />
            </div>
            <div className="mb-5">
              <label className="form-label" htmlFor="userType">
                UserType
              </label>
              <select
                className="form-select"
                id="userType"
                required={true}
                value={state.role}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, role: e.target.value }))
                }
              >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="mb-5">
              <label className="form-label" htmlFor="userType">
                Status
              </label>
              <select
                className="form-select"
                id="userType"
                required={true}
                value={state.isVerified}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, isVerified: e.target.value }))
                }
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
            <div className="mb-3 col">
              {loading && (
                <>
                  <MiniSpinner />
                </>
              )}

              <button
                className="btn btn-outline-primary w-100"
                type="button"
                onClick={(ev) => SubmitForm(ev)}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateUser;
