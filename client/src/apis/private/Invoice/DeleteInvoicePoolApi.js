import axios from "axios";

const DeleteInvoiceApi = async (id, authorizationToken) => {
  // id as params
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_CRUDINVOICEPOOL}/${id}`,
      {
        headers: {
          Authorization: `BEARER ${authorizationToken}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.log(e, " err in DeleteInvoicePoolApi");
    return e.response;
  }
};
export default DeleteInvoiceApi;
