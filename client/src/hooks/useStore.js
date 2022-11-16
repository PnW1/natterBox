import { useReducer, useEffect } from "react";

import ReducerFunction from "./ReducerFunction";
import initialValues from "./InitialValues";

const useStore = () => {
  const [state, dispatch] = useReducer(ReducerFunction, initialValues, () => {
    //intialising states if present in localstorage
    const userToken = JSON.parse(localStorage.getItem("TOKEN"));
    const userRole = JSON.parse(localStorage.getItem("ROLE"));
    const idVerified = JSON.parse(localStorage.getItem("IDVERIFIED"));
    var twitterId = localStorage.getItem("TWITTERID");
    if (twitterId !== undefined) {
      twitterId = JSON.parse(twitterId);
    }

    return userToken && userRole && twitterId
      ? {
          ...initialValues,
          token: userToken || null,
          role: userRole || null,
          idVerified: idVerified || null,
          twitterId: twitterId || null,
        }
      : initialValues;
  });

  useEffect(() => {
    if (state.twitterId !== undefined) {
      localStorage.setItem("TOKEN", JSON.stringify(state.token));
      localStorage.setItem("ROLE", JSON.stringify(state.role));
      localStorage.setItem("IDVERIFIED", JSON.stringify(state.idVerified));
      localStorage.setItem("TWITTERID", JSON.stringify(state.twitterId));
    }
  }, [state.token, state.role, state.idVerified, state.twitterId]);

  return [state, dispatch];
};
export default useStore;
