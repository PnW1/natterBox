import React from "react";
import moment from "moment";
import { Icon } from "@iconify/react";
const TransactionHistory = ({ rewardData }) => {
  return (
    <>
      {rewardData?.rewardData?.map((item) => {
        return (
          <div
            style={{
              background:
                "linear-gradient(98.97deg, #2C2C2E 1.64%, rgba(0, 0, 0, 0.5) 102.85%)",
              border: "1px solid #313131",
              borderRadius: "12px",
              color: "white",
              padding: "10px",
              margin: "5px",
              fontFamily: "Poppins",
            }}
          >
            <div
              style={{ fontFamily: "Poppins" }}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-2">
                <p
                  style={{
                    fontSize: "8px",
                    color: "#47DDFC",
                    marginBottom: "0px",
                  }}
                >
                  34% <Icon icon="akar-icons:arrow-up" />
                </p>
                <p
                  style={{
                    marginBottom: "0px",
                    fontSize: "20px",
                    fontFamily: "Roclette Pro",
                  }}
                >
                  {item?.rewardAmount}
                  <sub
                    style={{
                      color: "#47DDFC",
                      fontSize: "12px",
                      fontFamily: "Roclette Pro",
                      letterSpacing: "0.04em",
                    }}
                  >
                    SOL
                  </sub>{" "}
                </p>
              </div>
              <div>
                {moment.unix(item?.paidTime).format("Do MMM YYYY, h:mm:ss A")}
              </div>
              <div style={{ color: "#B4FF99" }}>Successful</div>
              {/* <div className='d-flex gap-2'>
                        <div style={{background: 'rgba(255, 255, 255, 0.03)',
                        boxShadow: '0px 2.74232px 2.74232px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(1.37116px)', borderRadius: '3px', padding:"0px 12px 0px 12px", display:"flex", alignItems:"center"}}><Icon icon="akar-icons:cloud-download" /></div>
                        <div style={{background: 'rgba(255, 255, 255, 0.03)',
                        boxShadow: '0px 2.74232px 2.74232px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(1.37116px)', borderRadius: '3px', padding:"10px", display:"flex", alignItems:"center"}}><Icon icon="ant-design:delete-filled" /></div>
                    </div> */}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TransactionHistory;
