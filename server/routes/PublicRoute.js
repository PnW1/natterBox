const router = require("express").Router();

const GetOneInvoiceController = require("../controllers/public/GetOneInvoiceController");
const GetAllInvoiceController = require("../controllers/public/GetAllInvoiceController");
const GetOneInvoicePoolController = require("../controllers/public/GetOneInvoicePoolController");
const GetPoolWithProjectNameController = require("../controllers/public/GetPoolWithProjectNameController");

//check server
router.get("/e", (req, res) => {
  res.send({ msg: "appServer is available" });
});

//find invoice by id - getOne invoice
router.get("/invoice/:id", GetOneInvoiceController);

router.get("/allInvoices", GetAllInvoiceController);

router.get(
  "/invoicePoolWithProjectName/:projectName",
  GetPoolWithProjectNameController
);
router.get("/invoicePool/:id", GetOneInvoicePoolController);

module.exports = router;
