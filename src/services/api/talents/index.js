import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "../../axios";
import { getApiUrl, getApiPrefix, getUserToken } from "../../../utils";

const get = async (user, id, params) => {
  return await getRequest(
    `${getApiUrl()}/${getApiPrefix(user)}/talents/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getUserToken(user)}`,
      },
      params,
    }
  );
};

const getAll = async (user, params) => {
  return await getRequest(`${getApiUrl()}/${getApiPrefix(user)}/talents`, {
    headers: {
      Authorization: `Bearer ${getUserToken(user)}`,
    },
    params,
  });
};

const store = async (user, data) => {
  return await postRequest(`${getApiUrl()}/${getApiPrefix(user)}/talents`, {
    headers: {
      Authorization: `Bearer ${getUserToken(user)}`,
    },
    data,
  });
};

const patch = async (user, id, data) => {
  return await patchRequest(
    `${getApiUrl()}/${getApiPrefix(user)}/talents/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getUserToken(user)}`,
      },
      data,
    }
  );
};

const destroy = async (user, id) => {
  return await deleteRequest(
    `${getApiUrl()}/${getApiPrefix(user)}/talents/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getUserToken(user)}`,
      },
    }
  );
};

export { get, getAll, store, patch, destroy };
