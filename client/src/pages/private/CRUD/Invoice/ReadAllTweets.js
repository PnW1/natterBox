import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import GetOneInvoicePoolApi from "../../../../apis/private/Invoice/GetOneInvoicePoolApi";

import Loader from "../../../../helpers/Loader";
import useDispatchFunc from "../../../../hooks/useDispatchFunc";
import useStatesFunc from "../../../../hooks/useStatesFunc";

const ReadAllTweets = () => {
  const { id } = useParams();

  const [{ token, loading }] = useStatesFunc();
  const [state, setState] = useState();
  const [dispatch] = useDispatchFunc();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      dispatch({ type: "loadingStart" });
      const { data } = await GetOneInvoicePoolApi(id);
      dispatch({ type: "loadingStop" });
      if (data.type === "success") {
        toast.success(data.msg);
        setState(data?.invoiceFound[0]?.pool[0]?.tweets);
      } else {
        toast.error(data.msg);
      }
    })();
  }, [dispatch, token]);
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <div className=" container border border-1 border-info rounded-3 bg-light p-md-5   my-3 text-dark fw-bold ">
        <div className="col">
          <div className="m-3">
            <button
              className="btn btn-info border-info text-white w-100 my-2"
              onClick={() =>
                navigate(
                  `/app/invoice/readOne/readAllPool/readOnePool/readAllTweet/addTweet/${id}`
                )
              }
            >
              Add Tweet
            </button>
          </div>
          <div className="bg-white p-4">
            <table className="table border border-1 table-hover">
              <thead>
                <tr>
                  <th>Tweet Url</th>
                </tr>
              </thead>
              <tbody>
                {state &&
                  state.map((invoiceObj) => (
                    <tr
                      key={invoiceObj._id}
                      className="text-break mouseCursorChanger"
                      // onClick={() =>
                      //   navigate(
                      //     `/app/invoice/readOne/readAllPool/readOnePool/${invoiceObj._id}`
                      //   )
                      // }
                    >
                      <td>{invoiceObj.tweetUrl}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadAllTweets;
