import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { isAuth, handleResponse } from "./auth";

export const createBlog = (blog, token) => {
  let createBlogEndpoint;
  if (isAuth() && isAuth().role === 1) {
    createBlogEndpoint = `${API}/blog`;
  } else if (isAuth() && isAuth().role === 0) {
    createBlogEndpoint = `${API}/user/blog`;
  }
  return fetch(createBlogEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  }).then((res) => {
    handleResponse(res);
    return res.json();
  });
};

export const listBlogsWithCategoriesTags = (skip, limit) => {
  const data = { skip, limit };
  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
};

export const singleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const listRelated = (blog, limit = 3) => {
  const data = { blog, limit };
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
};

export const list = () => {
  return fetch(`${API}/blogs`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const removeBlog = (slug, token) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    handleResponse(res);
    return res.json();
  });
};
export const updateBlog = (blog, token, slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  }).then((res) => {
    handleResponse(res);

    return res.json();
  });
};

export const listSearch = (params) => {
  let query = queryString.stringify(params);
  return fetch(`${API}/blogs/search?${query}`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};
