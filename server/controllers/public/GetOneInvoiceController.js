const Invoice = require("../../model/invoiceModel");

const GetOneInvoiceController = async (req, res) => {
  const { id } = req.params;
  try {
    //
    const invoiceFound = await Invoice.findById(id);
    if (!invoiceFound) {
      return res.status(404).send({ msg: "No Project Found", type: "error" });
    }
    res.send({ invoiceFound, msg: "Project available", type: "success" });
  } catch (e) {
    console.log(e.message, " err-in GetOneProjectController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = GetOneInvoiceController;
