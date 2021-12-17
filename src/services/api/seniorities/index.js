import { getRequest } from "../../axios";
import { getUserToken, getApiUrl } from "../../../utils";

const getAll = async (user) => {
  return await getRequest(`${getApiUrl()}/repository/seniorities`, {
    headers: {
      Authorization: `Bearer ${getUserToken(user)}`,
    },
  });
};

export { getAll };
