const Invoice = require("../../model/invoiceModel");
const mongoose = require("mongoose");

const GetFilteredInvoicePoolController = async (req, res) => {
  const { projectName } = req.params;
  try {
    //
    const invoicesFound = await Invoice.find({ projectName });

    if (invoicesFound.length === 0) {
      return res.status(404).send({ msg: "No Project Found", type: "error" });
    }
    res.send({
      invoicesFound,
      msg: "Single Project available",
      type: "success",
    });
  } catch (e) {
    console.log(e.message, " err-in GetOneProjectController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetFilteredInvoicePoolController;
