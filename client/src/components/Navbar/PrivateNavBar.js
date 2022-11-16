import React, { useEffect } from "react";
import axios from "axios";

import useDispatchFunc from "../../hooks/useDispatchFunc";
import {
  useWalletModal,
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

const PrivateNavBar = () => {
  const [dispatch] = useDispatchFunc();
  const {
    wallet,
    connect,
    sendTransaction,
    connecting,
    disconnect,
    disconnecting,
    publicKey,
    connected,
  } = useWallet();

  const [flag, setFlag] = React.useState(false);

  useEffect(() => {
    if (flag) {
      if (!connected) {
        dispatch({ type: "signout" });
      }
    }
    setFlag(true);
  }, [publicKey]);

  return (
    <>
      <div id="privateToggler" className="position-absolute">
        <button
          className="navbar-toggler d-block"
          type="button"
          onClick={() => dispatch({ type: "sidebarToggle" })}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <div className="navbar-nav ">
        {/* <button
          className="btn btn-outline-danger me-2 rounded-pill"
          type="button"
          onClick={() => dispatch({ type: "signout" })}
        >
          SignOut
        </button> */}
        <WalletDisconnectButton />
      </div>
    </>
  );
};

export default PrivateNavBar;
