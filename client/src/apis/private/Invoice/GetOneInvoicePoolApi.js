import axios from "axios";

const GetOneApi = async (id, authorizationToken) => {
  // id as params
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_GETONEINVOICEPOOL}/${id}`
    );
    return response;
  } catch (e) {
    console.log(e, " err in GetOneApi");
    return e.response;
  }
};
export default GetOneApi;
