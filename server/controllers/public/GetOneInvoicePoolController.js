const Invoice = require("../../model/invoiceModel");
const mongoose = require("mongoose");

const GetOneInvoicePoolController = async (req, res) => {
  const { id } = req.params;
  try {
    //
    const invoiceFound = await Invoice.find({
      "pool._id": mongoose.Types.ObjectId(id),
    }).select("-pool");
    const invoicePoolFound = await Invoice.find(
      {
        "pool._id": mongoose.Types.ObjectId(id),
      },
      { "pool.$": 1 } // to get only the pool data without project data
    );
    if (!invoiceFound) {
      return res.status(404).send({ msg: "No Data Found", type: "error" });
    }
    invoiceFound[0].pool = invoicePoolFound[0].pool[0];
    res.send({ invoiceFound, msg: "Data available", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in GetOnePoolController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetOneInvoicePoolController;
