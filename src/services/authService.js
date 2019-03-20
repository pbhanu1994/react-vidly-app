import http from "./httpServices";
import jwtDecode from "jwt-decode";

const apiEndPoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function loginUser(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, {
    email,
    password
  });

  localStorage.setItem(tokenKey, jwt);
}

export function logoutUser() {
  localStorage.removeItem(tokenKey);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  loginUser,
  loginWithJwt,
  logoutUser,
  getCurrentUser,
  getJwt
};
