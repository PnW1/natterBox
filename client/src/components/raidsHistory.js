import React from "react";
import moment from "moment";
import Card from "@mui/material/Card";

import { Icon } from "@iconify/react";
import { useState } from "react";

const RaidsHistory = ({ rewardData }) => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8];
  const [state, setState] = useState(false);
  const [data, setData] = useState(
    rewardData?.raidRewardData?.slice(0, 5).map((item) => {
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
            <div style={{ fontSize: "12px" }}>
              {moment.unix(item?.paidTime).format("Do MMM YYYY, h:mm:ss A")}
            </div>
            <div className="d-flex align-items-center gap-2">
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
              <p
                style={{
                  fontSize: "12px",

                  marginBottom: "0px",
                }}
              >
                $75.35
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#47DDFC",
                  marginBottom: "0px",
                }}
              >
                34% <Icon icon="akar-icons:arrow-up" />
              </p>
            </div>
            <div style={{ color: "#B4FF99" }}>
              <Icon
                style={{
                  background:
                    "linear-gradient(249.51deg, #00FFA3 -47.16%, #DC1FFF 140.55%)",
                }}
                icon="tabler:currency-solana"
              />
            </div>
            <div>
              <Icon color="white" icon="charm:menu-kebab" />
            </div>
          </div>
        </div>
      );
    })
  );

  const Expand = () => {
    if (state === false) {
      setState(true);

      setData(
        rewardData?.raidRewardData?.map((item) => {
          return (
            <div
              style={{
                background:
                  "linear-gradient(98.97deg, #2C2C2E 1.64%, rgba(0, 0, 0, 0) 102.85%)",
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
                <div style={{ fontSize: "12px" }}>
                  {moment.unix(item?.paidTime).format("Do MMM YYYY, h:mm:ss A")}
                </div>
                <div className="d-flex align-items-center gap-2">
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
                  <p
                    style={{
                      fontSize: "12px",

                      marginBottom: "0px",
                    }}
                  >
                    $75.35
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#47DDFC",
                      marginBottom: "0px",
                    }}
                  >
                    34% <Icon icon="akar-icons:arrow-up" />
                  </p>
                </div>
                <div style={{ color: "#B4FF99" }}>
                  <Icon
                    style={{
                      background:
                        "linear-gradient(249.51deg, #00FFA3 -47.16%, #DC1FFF 140.55%)",
                    }}
                    icon="tabler:currency-solana"
                  />
                </div>
                <div>
                  <Icon color="white" icon="charm:menu-kebab" />
                </div>
              </div>
            </div>
          );
        })
      );
    } else {
      setData(
        array.slice(0, 5).map((item) => {
          return (
            <div
              style={{
                background:
                  "linear-gradient(98.97deg, #2C2C2E 1.64%, rgba(0, 0, 0, 0) 102.85%)",
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
                <div style={{ fontSize: "12px" }}>21.05.22</div>
                <div className="d-flex align-items-center gap-2">
                  <p
                    style={{
                      marginBottom: "0px",
                      fontSize: "20px",
                      fontFamily: "Roclette Pro",
                    }}
                  >
                    0.25
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
                  <p
                    style={{
                      fontSize: "12px",

                      marginBottom: "0px",
                    }}
                  >
                    $75.35
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#47DDFC",
                      marginBottom: "0px",
                    }}
                  >
                    34% <Icon icon="akar-icons:arrow-up" />
                  </p>
                </div>
                <div style={{ color: "#B4FF99" }}>
                  <Icon
                    style={{
                      background:
                        "linear-gradient(249.51deg, #00FFA3 -47.16%, #DC1FFF 140.55%)",
                    }}
                    icon="tabler:currency-solana"
                  />
                </div>
                <div>
                  <Icon color="white" icon="charm:menu-kebab" />
                </div>
              </div>
            </div>
          );
        })
      );
      setState(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          background:
            "linear-gradient(98.97deg, #2C2C2E 1.64%, rgba(0, 0, 0, 0) 102.85%)",
          border: "2px solid #313131",
          borderRadius: "12px",
          color: "white",
          padding: "10px",
          margin: "5px",
        }}
      >
        {data}

        <div className="text-center">
          <button
            style={{
              background: "transparent",
              color: "white",
              border: "none",
            }}
            onClick={Expand}
          >
            <Icon icon="bi:chevron-double-down" />
          </button>
        </div>
      </Card>
    </>
  );
};

export default RaidsHistory;
