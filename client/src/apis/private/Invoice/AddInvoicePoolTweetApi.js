import axios from "axios";

const AddInvoicePoolTweetApi = async (id, data, authorizationToken) => {
  //id as params
  // data = { invoiceLogoImg, productName, qty, price, tax, dueDate }
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_INVOICEPOOLTWEETUPDATE}/${id}`,
      data,
      {
        headers: {
          Authorization: `BEARER ${authorizationToken}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.log(e, " err in AddInvoicePoolTweetApi");
    return e.response;
  }
};
export default AddInvoicePoolTweetApi;
