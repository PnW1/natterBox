const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./model/userModel");
require("./services/passport");
require("dotenv").config();
const keys = require("./config/keys");

const app = express();
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));

app.use(
  cookieSession({
    name: "quote machine",
    keys: [keys.cookieKey],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(setUser);

const dbConnectFunc = require("./db/dbIntegration");

require("./routes/AuthRoute")(app);
const AuthRoute = require("./routes/AuthRoute");
const PublicRoute = require("./routes/PublicRoute");
const InvoiceCrudRoute = require("./routes/InvoiceCrudRoute");
const CreateWalletRoute = require("./routes/CreateWalletRoute");
const UserCrudRoute = require("./routes/UserCrudRoute");
const tweets = require("./routes/tweetsRoute");
const reward = require("./routes/rewardRoute");

const AuthCheck = require("./middlewares/AuthCheck");

app.use("/api/public", PublicRoute);
// app.use("/api/auth", AuthRoute);
app.use("/api/crud/invoice", AuthCheck, InvoiceCrudRoute);
app.use("/api/crud/user", AuthCheck, UserCrudRoute);
app.use("/wallet", AuthCheck, CreateWalletRoute);
app.use("/reward", AuthCheck, reward);
app.use("/tweet", AuthCheck, tweets);

async function setUser(req, res, next) {
  const twitterId = req.body.twitterId;
  if (twitterId) {
    req.user = await User.find({ twitterId });
  }
  next();
}

dbConnectFunc()
  .then(() =>
    app.listen(process.env.PORT || 4080, () => {
      console.log("AppServer Started");
    })
  )
  .catch((e) => console.log(e.message, " ERR-index.js"));
