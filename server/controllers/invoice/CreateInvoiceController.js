const Invoice = require("../../model/invoiceModel");

const CheckRoleAccess = require("../../util/CheckRoleAccess");

const CreateInvoiceController = async (req, res) => {
  const { role, publicKey, id } = req.userObj;
  const {
    projectName,
    discordForProjectContact,
    projectTwitterUsername,
    mintCreatorAddress,
    numberOfNft,
    isRaid,
    imageUrl,
  } = req.body;
  try {
    const isEligible = CheckRoleAccess(["admin", "manager"], role);
    if (!isEligible) {
      return res.status(401).send({
        msg: "You are not allowed to access this service...contact your admin..",
        type: "error",
      });
    }
    const createdInvoice = await Invoice.create({
      projectName: projectName,
      discordForProjectContact: discordForProjectContact,
      projectTwitterUsername: projectTwitterUsername,
      invoiceCreaterRole: role, //added here
      invoiceCreaterPublicKey: publicKey, //added here
      invoiceCreater: id,
      mintCreatorAddress: mintCreatorAddress,
      numberOfNft: numberOfNft,
      isRaid: isRaid,
      imageUrl: imageUrl,
    });
    if (!createdInvoice) {
      return res
        .status(400)
        .send({ msg: "couldnot create Tweets...,try again", type: "error" });
    }

    res.send({
      createdInvoice,
      msg: "Project Created Successfully",
      type: "success",
    });
  } catch (e) {
    console.log(e.message, " err-in CreateProjectController");
    res.status(500).send({ msg: e.message, type: "failed" });
  }
};

module.exports = CreateInvoiceController;
