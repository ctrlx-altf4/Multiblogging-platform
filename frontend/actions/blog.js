import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { isAuth, handleResponse } from "./auth";

export const createBlog = (blog, token) => {
  let createBlogEndpoint;
  const formData = new FormData();
  formData.set("photo", blog.photo);
  return fetch(`${API}/uploads/featured`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((e) => e.json())
    .then((res) => {
      if (res.success) {
        blog.photo = res.fileName;
        if (isAuth() && isAuth().role === 1) {
          createBlogEndpoint = `${API}/blog`;
        } else if (isAuth() && isAuth().role === 0) {
          createBlogEndpoint = `${API}/user/blog`;
        }
        return fetch(createBlogEndpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(blog),
        }).then((res) => {
          console.log(blog);
          handleResponse(res);
          return res.json();
        });
      }
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

const updateBlogDb = (updated, token, slug) =>
  fetch(`${API}/blog/${slug}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updated),
  }).then((res) => {
    handleResponse(res);
    return res.json();
  });

export const updateBlog = (updated, token, slug) => {
  const formData = new FormData();

  if (updated.photo) {
    formData.set("photo", updated.photo);
    return fetch(`${API}/uploads/featured`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((e) => e.json())
      .then((res) => {
        if (res.success) {
          updated.photo = res.fileName;
          return updateBlogDb(updated, token, slug);
        }
      });
  }
  return updateBlogDb(updated, token, slug);
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
