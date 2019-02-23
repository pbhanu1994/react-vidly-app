import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/auth";

export function loginUser(email, password) {
  return http.post(apiEndPoint, {
    email,
    password
  });
}
