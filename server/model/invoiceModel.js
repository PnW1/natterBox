const mongoose = require("mongoose");
const User = require("./userModel");
const schema = mongoose.Schema;

const tweetSchema = schema({
  tweetUrl: {
    type: String,
  },
  tweetId: {
    type: String,
  },
  solanaPoolAddress: {
    type: String,
  },
  tweetText: {
    type: String,
  },
});

const poolSchema = schema({
  amount: {
    type: String,
  },
  splToken: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  rewardFrequency: {
    type: String,
    enum: ["day", "week", "month"],
    default: "day",
  },
  category: [{}],
  tweets: [tweetSchema],
});

const invoiceSchema = schema({
  pool: [poolSchema],
  projectName: {
    type: String,
    required: true,
  },
  projectTwitterUsername: {
    type: String,
    required: true,
  },
  discordForProjectContact: {
    type: String,
    required: true,
  },
  invoiceDate: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  mintCreatorAddress: {
    type: String,
  },
  numberOfNft: {
    type: String,
  },
  isRaid: {
    type: Boolean,
  },
  invoiceCreaterRole: {
    type: String,
    required: true,
  },
  invoiceCreaterPublicKey: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  invoiceCreater: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Invoice = mongoose.model("Invoice", invoiceSchema, "invoiceCollection");

module.exports = Invoice;
