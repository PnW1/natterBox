import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import InvoiceFetchDataFunc from "../../../../apis/public/others/InvoiceFetchDataFunc";

import Loader from "../../../../helpers/Loader";

import useDispatchFunc from "../../../../hooks/useDispatchFunc";
import useStatesFunc from "../../../../hooks/useStatesFunc";

const ReadOneInvoice = () => {
  const [dispatch] = useDispatchFunc();
  const [{ loading }] = useStatesFunc();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getinvoiceData = async () => {
      dispatch({ type: "loadingStart" });

      // this is for Details esssential for invoice
      const { data } = await InvoiceFetchDataFunc(id);
      dispatch({ type: "loadingStop" });
      if (data.type === "success") {
        toast.success(data.msg);
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

  return (
    <div>
      <div className="my-5 container" style={{background: '#2C2C2E',
boxShadow: '11.7355px 11.7355px 29.3386px rgba(0, 0, 0, 0.5)',
borderRadius: '19.5591px'}}>
        <div className="">
          <div className="display-5 p-3 m-3 text-center text-white project_info">
            Project Info
          </div>
          <div className="d-flex flex-column flex-md-row ms-auto justify-content-evenly align-content-center row p-md-5 py-2 ">
            <div className="col-8 col-md-6 m-3">
              <button
                className="btn btn-dark border-dark text-white w-100 my-2"
                onClick={() =>
                  navigate(`/app/invoice/readOne/readAllPool/${id}`)
                }
              >
                Pools
              </button>
            </div>
            <div className="col-8 col-md-6 m-3">
              <button
                className="btn btn-dark border-dark text-white w-100 my-2"
                onClick={() => navigate(`/app/invoice/update/${id}`)}
              >
                Update Project
              </button>
            </div>
            <div className="col-8 col-md-6 m-3">
              <button
                className="btn btn-dark border-dark text-white w-100 my-2"
                onClick={() => navigate(`/app/invoice/delete/${id}`)}
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadOneInvoice;
