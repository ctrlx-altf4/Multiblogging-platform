import fetch from "isomorphic-fetch";
import { API } from "../config";

import { isAuth, handleResponse } from "./auth";

export const userPublicProfile = (username) => {
  return fetch(`${API}/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((res) => {
    return res.json();
  });
};

export const getProfile = (token) => {
  return fetch(`${API}/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  });
};

export const update = (token, user) => {
  return fetch(`${API}/user/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  }).then((res) => {
    handleResponse(res);
    return res.json();
  });
};
