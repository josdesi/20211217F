import axios from "axios";

const defaultsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getRequest = (url, { headers = {}, params = {} }) => {
  return axios
    .get(url, {
      params,
      headers: {
        ...defaultsHeaders,
        ...headers,
      },
    })
    .then((response) => response.data);
};

const postRequest = (url, { headers = {}, data = {} }) => {
  return axios
    .post(url, data, {
      headers: {
        ...defaultsHeaders,
        ...headers,
      },
    })
    .then((response) => response.data);
};

const patchRequest = (url, { headers = {}, data = {} }) => {
  return axios
    .patch(url, data, {
      headers: {
        ...defaultsHeaders,
        ...headers,
      },
    })
    .then((response) => response.data);
};

const deleteRequest = (url, { headers = {} }) => {
  return axios
    .delete(url, {
      headers: {
        ...defaultsHeaders,
        ...headers,
      },
    })
    .then((response) => response.data);
};

export { getRequest, postRequest, patchRequest, deleteRequest };
