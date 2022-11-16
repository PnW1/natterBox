const mongoose = require("mongoose");
const schema = mongoose.Schema;

const walletSchema = schema({
  publicKey: {
    type: String,
  },
  privateKey: {
    type: String,
  },
  accountHolder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Wallet = mongoose.model("Wallet", walletSchema, "walletCollection");
module.exports = Wallet;
