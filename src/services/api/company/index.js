import { getRequest, postRequest, patchRequest } from "../../axios";
import { getApiUrl, getApiPrefix, getUserToken } from "../../../utils";

const get = async (user, id, params) => {
  return await getRequest(`${getApiUrl()}/repository/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${getUserToken(user)}`,
    },
    params,
  });
};

const getAll = async (user, params) => {
  return await getRequest(`${getApiUrl()}/repository/companies`, {
    headers: {
      Authorization: `Bearer ${getUserToken(user)}`,
    },
    params,
  });
};

const store = async (user, data) => {
  return await postRequest(`${getApiUrl()}/${getApiPrefix(user)}/companies`, {
    headers: {
      Authorization: `Bearer ${getUserToken(user)}`,
    },
    data,
  });
};

const patch = async (user, id, data) => {
  return await patchRequest(
    `${getApiUrl()}/${getApiPrefix(user)}/companies/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getUserToken(user)}`,
      },
      data,
    }
  );
};

export { getAll, get, store, patch };
