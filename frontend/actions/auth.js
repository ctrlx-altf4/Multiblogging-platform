import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { API } from "../config";

const token = "MultiBlogToken_ctrlxAltf4"; //cookie key
const user = "MultBlogUser_ctrlxAltf4"; //localStorage key

export const signupAction = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const signInAction = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const signOutAction = (next) => {
  removeCookie(token);
  removeLocalStorage(user);
  next();
  fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((res) => {
      console.log("signout success");
    })
    .catch((err) => console.log(err));
};

//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
//remove cookie
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};
//get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

//localStorage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

//authenticate user by passing data to cookie and localStorage
export const authenticate = (data, next) => {
  setCookie(token, data.token);
  setLocalStorage(user, data.user);
  next();
};
export const isAuth = () => {
  if (process.browser) {
    if (getCookie(token)) {
      if (localStorage.getItem(user)) {
        return JSON.parse(localStorage.getItem(user));
      }
      return false;
    }
  }
};
