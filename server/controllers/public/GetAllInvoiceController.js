const Invoice = require("../../model/invoiceModel");

const GetAllInvoiceController = async (req, res) => {
  try {
    //
    const invoicesFound = await Invoice.find().populate("invoiceCreater");
    if (!invoicesFound) {
      return res.status(404).send({ msg: "No Project Found", type: "error" });
    }
    res.send({ invoicesFound, msg: "Projects available", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in GetAllProjectController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetAllInvoiceController;
