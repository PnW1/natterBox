const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");
const mongoose = require("mongoose");

const GetAllInvoiceController = async (req, res) => {
  let invoiceArray;
  const { role, id } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    //
    if (role === "admin") {
      invoiceArray = await Invoice.find().populate("invoiceCreater");
    } else {
      invoiceArray = await Invoice.find({
        invoiceCreater: mongoose.Types.ObjectId(id),
      }).populate("invoiceCreater");
    }
    if (invoiceArray.length < 1) {
      return res.status(404).send({ msg: "No Project Found", type: "error" });
    }
    res.send({ invoiceArray, msg: "Listed array", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in GetAllController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetAllInvoiceController;
