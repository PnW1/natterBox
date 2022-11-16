const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  twitterId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  publicKey: {
    type: String,
  },
  accessToken: {
    type: String,
    required: true,
  },
  accessTokenSecret: {
    type: String,
    required: true,
  },
  amountToPay: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "manager", "user"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: true, //need to change later to false
  },
  rewardStatus: [
    {
      isRewardpaid: { type: Boolean, default: false },
      tweetId: { type: String },
      tweetText: { type: String },
      rewardToken: { type: String },
      projectName: { type: String },
      tweetCreatedAt: { type: String },
      paidTime: { type: String },
      rewardAmount: { type: String },
    },
  ],
  raidStatus: {
    likeStatus: [
      {
        tweetId: { type: String },
        projectName: { type: String },
        paidTime: { type: String },
        rewardAmount: { type: String },
      },
    ],
    retweetStatus: [
      {
        tweetId: { type: String },
        projectName: { type: String },
        paidTime: { type: String },
        rewardAmount: { type: String },
      },
    ],
    replyStatus: [
      {
        tweetId: { type: String },
        projectName: { type: String },
        paidTime: { type: String },
        rewardAmount: { type: String },
      },
    ],
  },
});

const User = mongoose.model("User", userSchema, "userCollection");
module.exports = User;
