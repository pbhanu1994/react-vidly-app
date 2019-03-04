import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(null, error => {
  //Expected Error
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log("Logging the error: ", error);
    logger.log(error);
    toast.error("Something went wrong.");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  //Setting token as a header to the http request
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt
};
