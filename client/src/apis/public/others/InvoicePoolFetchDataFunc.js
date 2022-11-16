import axios from "axios";

const InvoicePoolFetchDataFunc = async (data) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_INVOICEPOOLFETCHDATA}/${data}`
    );
    return response;
  } catch (e) {
    return e.response;
  }
};

export default InvoicePoolFetchDataFunc;
