import React, { useState } from "react";

const MainScreenTemplate = ({ role }) => {
  const [count, setCount] = useState();
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
            {/* Welcome {role.toUpperCase()} */}
            {/* Coming Soon.... */}
          </div>
          {/* <div className="col my-2 p-md-3 mx-auto d-flex justify-content-center " style={{borderRadius:"30px"}}>
            <div className="p-md-5 p-4 bg-black border border-1  text-center text-light mx-auto shadow border-5"  >
              <div className="fw-bolder  lead">Total Tweets : {count} </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default MainScreenTemplate;
