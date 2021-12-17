import { getRequest } from "../../axios";
import { getUserToken, getApiUrl } from "../../../utils";

const getAll = async (user) => {
  return await getRequest(`${getApiUrl()}/repository/currencies`, {
    headers: {
      Authorization: `Bearer ${getUserToken(user)}`,
    },
  });
};

export { getAll };
