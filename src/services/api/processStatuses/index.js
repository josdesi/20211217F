import { getRequest } from "../../axios";
import { getUserToken, getApiUrl } from "../../../utils";

const getAll = async (user) => {
  return await getRequest(`${getApiUrl()}/repository/process-statuses`, {
    headers: {
      Authorization: `Bearer ${getUserToken(user)}`,
    },
  });
};

export { getAll };
