import axios from "axios";
import React, { useEffect, useState } from "react";
import useStatesFunc from "../../../hooks/useStatesFunc";
import { useNavigate } from "react-router-dom";

const MainScreenTemplate = ({ role }) => {
  const [getAllInvoices, setGetAllInvoices] = useState();
  const [getCurrentUserInvoice, setgetCurrentUserInvoice] = useState();
  const [{ twitterId }] = useStatesFunc();
  const navigate = useNavigate();
  const getAllTweets = async () => {
    var res;

    res = await axios.get(
      `${process.env.REACT_APP_SERVERURL}/api/public/allInvoices`
    );

    if (res?.data?.invoicesFound) {
      console.log("Res: ", res.data)
      // const AllInvoices = [
      //   ...new Map(
      //     res?.data?.invoicesFound.map((m) => [m.invoiceCreater?.twitterId, m])
      //   ).values(),
      // ];

      const UserInvoices = res?.data?.invoicesFound?.filter(
        (data) => data?.invoiceCreater?.twitterId == twitterId
      );
      console.log("UserInvoices: ",UserInvoices)

      setGetAllInvoices(
        res?.data?.invoicesFound?.map(
          (current) => current.invoiceCreater.rewardStatus
        )
      );
      setgetCurrentUserInvoice(
        UserInvoices?.map((current) => {console.log("current: ",current); return current.invoiceCreater.rewardStatus})
      );
    } else {
      alert("No Tweet Found");
    }
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  console.log("userInvoices", getCurrentUserInvoice);
  console.log("allInvoices", getAllInvoices);

  if (role == "manager") {
    return (
      <>
        <div
          className="col container p-md-5 py-2 my-5"
          style={{
            background: "#2C2C2E",
            boxShadow: "11.7355px 11.7355px 29.3386px rgba(0, 0, 0, 0.5)",
            borderRadius: "19.5591px",
          }}
        >
          <div className="p-4" style={{ background: "#2C2C2E" }}>
            <div className="display-4 my-3 p-md-3 col text-white text-center welcome_admin">
              Welcome {role.toUpperCase()}
              {/* Coming Soon.... */}
            </div>
            <div
              className="col my-2 p-md-3 mx-auto d-flex justify-content-center "
              style={{ borderRadius: "30px" }}
            >
              <div className="p-md-5 p-4 bg-black border border-1  text-center text-light mx-auto shadow border-5">
                <div className="fw-bolder  lead">
                  Total Tweets :{" "}
                  {getCurrentUserInvoice && getCurrentUserInvoice[0]?.length}{" "}
                </div>
              </div>
            </div>
            <div className="px-md-4 pt-2 pb-2">
              <div
                className="col border border-1"
                style={{ overflowX: "auto" }}
              >
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Reward Token </th>
                      <th>Created At </th>
                      <th>Tweet Id </th>
                      <th>Tweet Text </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentUserInvoice &&
                      getCurrentUserInvoice[0].map((invoiceObj) => (
                        <tr
                          key={invoiceObj._id}
                          className="text-break mouseCursorChanger"
                          onClick={() =>
                            navigate(`/app/invoice/readOne/${invoiceObj._id}`)
                          }
                        >
                          {invoiceObj.projectName.charAt(
                            invoiceObj.projectName.length - 2
                          ) == "#" ? (
                            <td>{invoiceObj.projectName.slice(0, -2)}</td>
                          ) : invoiceObj.projectName.charAt(
                              invoiceObj.projectName.length - 3
                            ) == "#" ? (
                            <td>{invoiceObj.projectName.slice(0, -3)}</td>
                          ) : (
                            <td>{invoiceObj.projectName}</td>
                          )}

                          <td>{invoiceObj.rewardToken}</td>
                          <td>{invoiceObj.tweetCreatedAt}</td>
                          <td>{invoiceObj.tweetId}</td>
                          <td>{invoiceObj.tweetText}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (role == "admin") {
    return (
      <>
        <div
          className="col container p-md-5 py-2 my-5"
          style={{
            background: "#2C2C2E",
            boxShadow: "11.7355px 11.7355px 29.3386px rgba(0, 0, 0, 0.5)",
            borderRadius: "19.5591px",
          }}
        >
          <div className="p-4" style={{ background: "#2C2C2E" }}>
            <div className="display-4 my-3 p-md-3 col text-white text-center welcome_admin">
              Welcome {role.toUpperCase()}
              {/* Coming Soon.... */}
            </div>
            <div
              className="col my-2 p-md-3 mx-auto d-flex justify-content-center "
              style={{ borderRadius: "30px" }}
            >
              <div className="p-md-5 p-4 bg-black border border-1  text-center text-light mx-auto shadow border-5">
                <div className="fw-bolder  lead">
                  Total Tweets :
                  {getAllInvoices &&
                    (function total() {
                      let len = 0;
                      getAllInvoices.forEach((element) => {
                        len = len + element.length;
                      });
                      return len;
                    })()}
                </div>
              </div>
            </div>

            <div className="px-md-4 pt-2 pb-2">
              <div
                className="col border border-1"
                style={{ overflowX: "auto" }}
              >
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th>Project Name</th>
                      <th>Reward Token </th>
                      <th>Created At </th>
                      <th>Tweet Id </th>
                      <th>Tweet Text </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllInvoices &&
                      getAllInvoices.map((single) =>
                        single.map((invoiceObj) => (
                          <tr
                            key={invoiceObj._id}
                            className="text-break mouseCursorChanger"
                            onClick={() =>
                              navigate(`/app/invoice/readOne/${invoiceObj._id}`)
                            }
                          >
                            <td>{invoiceObj.projectName}</td>
                            <td>{invoiceObj.rewardToken}</td>
                            <td>{invoiceObj.tweetCreatedAt}</td>
                            <td>{invoiceObj.tweetId}</td>
                            <td>{invoiceObj.tweetText}</td>
                          </tr>
                        ))
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="col container p-md-5 py-2 my-5"
          style={{
            background: "#2C2C2E",
            boxShadow: "11.7355px 11.7355px 29.3386px rgba(0, 0, 0, 0.5)",
            borderRadius: "19.5591px",
          }}
        >
          <div className="p-4" style={{ background: "#2C2C2E" }}>
            <div className="display-4 my-3 p-md-3 col text-white text-center welcome_admin">
              Welcome {role.toUpperCase()}
              {/* Coming Soon.... */}
            </div>
            <div
              className="col my-2 p-md-3 mx-auto d-flex justify-content-center "
              style={{ borderRadius: "30px" }}
            >
              <div className="p-md-5 p-4 bg-black border border-1  text-center text-light mx-auto shadow border-5">
                <div className="fw-bolder  lead">Total Tweets : {} </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default MainScreenTemplate;
