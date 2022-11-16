const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");
const mongoose = require("mongoose");

const DeleteInvoicePoolController = async (req, res) => {
  const { id } = req.params;
  const { role } = req.userObj;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    //
    const invoiceAvailable = await Invoice.find({
      "pool._id": mongoose.Types.ObjectId(id),
    });
    if (!invoiceAvailable) {
      return res.status(404).send({ msg: "no Pool found", type: "error" });
    }

    await Invoice.updateOne(
      {
        "pool._id": mongoose.Types.ObjectId(id),
      },
      { $pull: { pool: { _id: mongoose.Types.ObjectId(id) } } }
    );
    res.send({ msg: "deleted Pool successfully", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in DeleteProjectPoolController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = DeleteInvoicePoolController;
