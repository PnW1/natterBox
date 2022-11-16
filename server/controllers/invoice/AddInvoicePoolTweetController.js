const mongoose = require("mongoose");
const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const UpdateInvoiceController = async (req, res) => {
  const { role } = req.userObj;
  const { id } = req.params;
  //this endpoint to change QTY,logo and dueDate only (only practical usecase)
  //-> cannot modify other things,instead of updation, delete current and create new invoice
  const { tweets } = req.body;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    //first such invoice available or not
    const currentInvoice = await Invoice.find({
      "pool._id": mongoose.Types.ObjectId(id),
    });
    if (!currentInvoice) {
      return res.status(404).send({ msg: "Not Found", type: "error" });
    }

    let updatedInvoice = await Invoice.findOneAndUpdate(
      { "pool._id": mongoose.Types.ObjectId(id) },
      {
        $push: {
          "pool.$.tweets": tweets,
        },
      }
    );

    if (!updatedInvoice) {
      return res
        .status(400)
        .send({ msg: "couldnot update...,try again", type: "error" });
    }

    res.send({ msg: "Updated Successfully", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in UpdateProjectController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = UpdateInvoiceController;
