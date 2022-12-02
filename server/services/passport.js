const passport = require("passport");
const mongoose = require("mongoose");
const TwitterStrategy = require("passport-twitter").Strategy;
const keys = require("../config/keys");

const User = require("../model/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);

  done(null, user);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.twitterConsumerKey,
      consumerSecret: keys.twitterConsumerSecret,
      callbackURL: "http://localhost:4080/oauth/callback/twitter.com",
      // callbackURL: "https://api.chatterr.xyz/oauth/callback/twitter.com",
      proxy: true,
    },
    async (accessToken, accessTokenSecret, refreshToken, profile, done) => {
      const existingUser = await User.findOneAndUpdate(
        { twitterId: profile.id },
        {
          $set: {
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret,
          },
        },
        {
          new: true,
        }
      );
      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = await new User({
          twitterId: profile.id,
          userName: profile.username,
          displayName: profile.displayName,
          accessToken: accessToken,
          accessTokenSecret: accessTokenSecret,
        }).save();
        return done(null, user);
      }
    }
  )
);
