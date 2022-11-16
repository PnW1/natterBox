import React from "react";

const Loader = () => {
  return (
    <>
      <div className="container">
        <div
          className="d-flex justify-content-center align-items-center text-primary opacity-50"
          style={{ height: "450px" }}
        >
          <div
            className="spinner-grow"
            role="status"
            style={{ height: "6rem", width: "6rem" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
