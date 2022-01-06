import { cache } from "../utils/cache";

const REACT_APP_API_URL = "http://192.168.1.9:8080/";

export const get = async (url) => {
  const token = await cache.get("LaPaz_auth_token");

  const bodyOpts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      LaPaz_auth_token: token,
      credentials: "include",
    },
  };
  return fetch(`${REACT_APP_API_URL}${url}`, bodyOpts);
};

export const post = async (url, body = {}) => {
  const token = await cache.get("LaPaz_auth_token");
  const bodyOpts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      LaPaz_auth_token: token,
      credentials: "include",
    },
    body: JSON.stringify(body),
  };
  return fetch(`${REACT_APP_API_URL}${url}`, bodyOpts);
};

export const put = async (url, body = {}) => {
  const token = await cache.get("LaPaz_auth_token");

  const bodyOpts = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      LaPaz_auth_token: token,
      credentials: "include",
    },
    body: JSON.stringify(body),
  };
  return fetch(`${REACT_APP_API_URL}${url}`, bodyOpts);
};
