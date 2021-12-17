import { postRequest } from "../axios";
import { getApiUrl } from "../../utils/request";

const signIn = async (data) => {
  return await postRequest(`${getApiUrl()}/auth/signin`, {
    data,
  });
};

export { signIn };
