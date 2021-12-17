import { getRequest } from "../../axios";
import { getUserToken, getApiUrl } from "../../../utils";

const getAll = async (user, params) => {
  return await getRequest(`${getApiUrl()}/repository/company-types`, {
    headers: {
      Authorization: `Bearer ${getUserToken(user)}`,
    },
    params,
  });
};

export { getAll };
