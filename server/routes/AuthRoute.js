const { signToken } = require("../util/tokenFunc");
const { verifyToken } = require("../util/tokenFunc");
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../model/userModel");

module.exports = (app) => {
  app.get("/auth/twitter", passport.authenticate("twitter"));
  app.get(
    "/oauth/callback/twitter.com",
    passport.authenticate("twitter"),
    (req, res) => {
      // res.redirect("http://localhost:3000/Landing");
      res.redirect("https://chatterr.xyz/Landing");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logOut();
    // res.redirect("http://localhost:3000");
    res.redirect("https://chatterr.xyz");
  });
  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      const tokenPayload = {
        name: req.user.displayName,
        twitterId: req.user.twitterId,
        email: req.user.isVerified,
        publicKey: req.user.publicKey,
        id: req.user._id,
        role: req.user.role,
        accessToken: req.user.accessToken,
        accessTokenSecret: req.user.accessTokenSecret,
      };
      const token = signToken(tokenPayload);

      var raidStatus;
      if (!req.user.raidStatus) {
        raidStatus = "";
      } else {
        raidStatus = req.user.raidStatus;
      }

      if (req.user.rewardStatus) {
        res.send({
          token,
          msg: `Welcome ${req.user.displayName}`,
          type: "success",
          isVerified: req.user.isVerified,
          role: req.user.role,
          id: req.user.twitterId,
          twitterId: req.user.twitterId,
          userName: req.user.userName,
          userId: req.user._id,
          rewardStatus: req.user.rewardStatus,
          raidStatus,
          amountToPay: req.user.amountToPay,
          accessToken: req.user.accessToken,
          accessTokenSecret: req.user.accessTokenSecret,
        });
      } else {
        res.send({
          token,
          msg: `Welcome ${req.user.displayName}`,
          type: "success",
          twitterId: req.user.twitterId,
          isVerified: req.user.isVerified,
          role: req.user.role,
          id: req.user.twitterId,
          userName: req.user.userName,
          userId: req.user._id,
          raidStatus,
          amountToPay: req.user.amountToPay,
          accessToken: req.user.accessToken,
          accessTokenSecret: req.user.accessTokenSecret,
        });
      }
    } else {
      res.send(req.user);
    }
  });
  app.patch("/api/addUserWalletPublicKey", async (req, res) => {
    try {
      const existingUser = await User.findOne({
        publicKey: req.body.publicKey,
      });
      if (!existingUser) {
        let user = await User.findOneAndUpdate(
          {
            twitterId: req.body.twitterId,
          },
          { $set: { publicKey: req.body.publicKey } },
          { $set: true }
        );
        return res.send(user);
      } else {
        return res.send(existingUser);
      }
    } catch (err) {
      console.log(err, "Error");
    }
  });
};
