import "./App.css";
import React, { useMemo, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import * as actions from "../src/actions";
import "react-toastify/dist/ReactToastify.css";
import Profledescription from "./components/Profledescription";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

//publicLayout
import Home from "./components/Home";

//Navigation
import NavigationBar from "./NavigationBar";

import NotFound from "./components/NotFound";

// import Signin from "./pages/public/views/Signin";
import LoginPage from "./pages/public/views/LoginPage";
import ResetPassword from "./pages/public/views/ResetPassword";
import EmailActivation from "./pages/public/views/EmailActivation";
import UserProvider from "./context/UserProvider";

//privateRoutes
import Dashboard from "./pages/private/views/Dashboard";
import MainScreen from "./pages/private/views/MainScreen";
import Protected from "./components/Protected";

//userRoutes
import CreateUser from "./pages/private/CRUD/User/CreateUser";
import UpdateUser from "./pages/private/CRUD/User/UpdateUser";
import ReadUser from "./pages/private/CRUD/User/ReadUser";
import ReadOneUser from "./pages/private/CRUD/User/ReadOneUser";
import DeleteUser from "./pages/private/CRUD/User/DeleteUser";

//invoiceRoutes
import CreateInvoice from "./pages/private/CRUD/Invoice/CreateInvoice";
import UpdateInvoice from "./pages/private/CRUD/Invoice/UpdateInvoice";
import ReadAllInvoices from "./pages/private/CRUD/Invoice/ReadAllInvoices";
import ReadOneInvoice from "./pages/private/CRUD/Invoice/ReadOneInvoice";
import DeleteInvoice from "./pages/private/CRUD/Invoice/DeleteInvoice";

import AddPool from "./pages/private/CRUD/Invoice/AddPool";
import AddTweet from "./pages/private/CRUD/Invoice/AddTweet";
import ReadAllPool from "./pages/private/CRUD/Invoice/ReadAllPool";
import ReadOnePool from "./pages/private/CRUD/Invoice/ReadOnePool";
import UpdatePool from "./pages/private/CRUD/Invoice/UpdatePool";
import DeletePool from "./pages/private/CRUD/Invoice/DeletePool";
import Tweets from "./components/Tweets";
import ReadAllTweets from "./pages/private/CRUD/Invoice/ReadAllTweets";
import Landing from "./components/Landing";
import LandingHome from "./components/LandingHome";

function App(props) {
  require("@solana/wallet-adapter-react-ui/styles.css");
  // const network = WalletAdapterNetwork.Devnet;
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new CoinbaseWalletAdapter(),
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  useEffect(() => {
    props.fetchUser();
  }, []);
  return (
    <>
      <div className="app_bg" sx={{ backgroundColor: "black" }}>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider autoConnect={true} wallets={wallets}>
            <WalletModalProvider>
              <UserProvider>
                {/* <NavigationBar /> */}

                <Routes>
                  <Route path="/Landing" element={<Landing />} />
                  <Route path="/" element={<LandingHome />} />
                  {/* <Route path="/" element={<Home />} /> */}

                  <Route path="/user">
                    <Route path="loginPage" element={<LoginPage />} />
                  </Route>

                  <Route
                    path="projects/:projectName"
                    element={
                      // <Protected redirect={<LoginPage />}>
                      <Protected redirect={<Landing />}>
                        <Tweets />
                      </Protected>
                    }
                  />
                  <Route
                    path="projects/"
                    element={
                      // <Protected redirect={<LoginPage />}>
                      <Protected redirect={<Landing />}>
                        <Tweets />
                      </Protected>
                    }
                  />
                  <Route
                    path="/app"
                    element={
                      // <Protected redirect={<Home />}>
                      <Protected redirect={<Landing />}>
                        <Dashboard />
                      </Protected>
                    }
                  >
                    <Route
                      path=""
                      element={
                        // <Protected redirect={<Home />}>
                        <Protected redirect={<Landing />}>
                          <MainScreen />
                        </Protected>
                      }
                    />
                    <Route
                      path="dashboard"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <MainScreen />
                        </Protected>
                      }
                    />

                    {/* here all user crud components */}
                    <Route
                      path="user/create"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <CreateUser />
                        </Protected>
                      }
                    />
                    <Route
                      path="user/update/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <UpdateUser />
                        </Protected>
                      }
                    />
                    <Route
                      path="user/readAll"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <ReadUser />
                        </Protected>
                      }
                    />
                    <Route
                      path="user/readOne/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <ReadOneUser />
                        </Protected>
                      }
                    />
                    <Route
                      path="user/delete/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <DeleteUser />
                        </Protected>
                      }
                    />

                    {/* here invoice CRUD routes */}

                    <Route
                      path="invoice/create"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <CreateInvoice />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/readOne/readAllPool/addPool/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <AddPool />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/readOne/readAllPool/readOnePool/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <ReadOnePool />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/readOne/readAllPool/update/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <UpdatePool />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/readOne/readAllPool/delete/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <DeletePool />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/update/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <UpdateInvoice />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/delete/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <DeleteInvoice />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/readOne/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <ReadOneInvoice />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/readAll"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <ReadAllInvoices />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/readOne/readAllPool/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <ReadAllPool />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/readOne/readAllPool/readOnePool/readAllTweet/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <ReadAllTweets />
                        </Protected>
                      }
                    />
                    <Route
                      path="invoice/readOne/readAllPool/readOnePool/readAllTweet/AddTweet/:id"
                      element={
                        // <Protected redirect={<LoginPage />}>
                        <Protected redirect={<Landing />}>
                          <AddTweet />
                        </Protected>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />

                  {/* here all app routes completes */}

                  <Route path="*" element={<NotFound />} />
                </Routes>

                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </UserProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </div>
    </>
  );
}

export default connect(null, actions)(App);
