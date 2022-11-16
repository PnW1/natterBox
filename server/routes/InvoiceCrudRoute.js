const router = require("express").Router();

const GetAllInvoiceController = require("../controllers/invoice/GetAllInvoiceController");

const CreateInvoiceController = require("../controllers/invoice/CreateInvoiceController");
const UpdateInvoiceController = require("../controllers/invoice/UpdateInvoiceController");
const UpdateInvoicePoolController = require("../controllers/invoice/UpdateInvoicePoolController");
const AddInvoicePoolTweetController = require("../controllers/invoice/AddInvoicePoolTweetController");
const DeleteInvoicePoolController = require("../controllers/invoice/DeleteInvoicePoolController");
const DeleteInvoiceController = require("../controllers/invoice/DeleteInvoiceController");

//getAll invoices
router.get("/", GetAllInvoiceController);

//create invoice
router.post("/", CreateInvoiceController);

//update invoice
router.delete("/deletePool/:id", DeleteInvoicePoolController);

router.patch("/addPoolTweet/:id", AddInvoicePoolTweetController);
router.patch("/updatePool/:id", UpdateInvoicePoolController);

router.patch("/:id", UpdateInvoiceController);

//delete invoice
router.delete("/:id", DeleteInvoiceController);

module.exports = router;
