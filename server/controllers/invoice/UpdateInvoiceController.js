const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");

const UpdateInvoiceController = async (req, res) => {
  const { role } = req.userObj;
  const { id } = req.params;
  //this endpoint to change QTY,logo and dueDate only (only practical usecase)
  //-> cannot modify other things,instead of updation, delete current and create new invoice
  const {
    projectName,
    discordForProjectContact,
    projectTwitterUsername,
    mintCreatorAddress,
    pool,
  } = req.body;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    //first such invoice available or not
    const currentInvoice = await Invoice.findById(id);
    if (!currentInvoice) {
      return res.status(404).send({ msg: "Not Found", type: "error" });
    }
    let updatedInvoice;
    if (!pool) {
      updatedInvoice = await Invoice.findByIdAndUpdate(
        { _id: id },
        {
          projectName,
          discordForProjectContact,
          projectTwitterUsername,
          mintCreatorAddress,
        }
      );
    } else {
      updatedInvoice = await Invoice.updateOne(
        { _id: id },
        { $push: { pool } }
      );
    }
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
