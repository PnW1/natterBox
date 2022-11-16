const Invoice = require("../../model/invoiceModel");
const CheckRoleAccess = require("../../util/CheckRoleAccess");
const mongoose = require("mongoose");

const UpdateInvoiceController = async (req, res) => {
  const { role } = req.userObj;
  const { id } = req.params;
  //this endpoint to change QTY,logo and dueDate only (only practical usecase)
  //-> cannot modify other things,instead of updation, delete current and create new invoice
  const {
    amount,
    category,
    rewardFrequency,
    startTime,
    tweetUrl,
    tweetId,
    solanaPoolAddress,
    splToken,
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
    const currentInvoicePool = await Invoice.find({
      "pool._id": mongoose.Types.ObjectId(id),
    });
    if (!currentInvoicePool) {
      return res
        .status(404)
        .send({ msg: "No such invoice Available", type: "error" });
    }

    let updatedInvoice = await Invoice.updateOne(
      {
        "pool._id": mongoose.Types.ObjectId(id),
      },
      {
        $set: {
          "pool.$": {
            amount,
            rewardFrequency,
            category,
            startTime,
            tweetUrl,
            tweetId,
            solanaPoolAddress,
            splToken,
          },
        },
      }
    );

    if (!updatedInvoice) {
      return res
        .status(400)
        .send({ msg: "couldnot update project...,try again", type: "error" });
    }

    res.send({ msg: "Updated Successfully", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in UpdateProjectController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = UpdateInvoiceController;
