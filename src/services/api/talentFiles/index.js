import { getRequest, postRequest, deleteRequest } from "../../axios";
import { getApiPrefix, getUserToken, getApiUrl } from "../../../utils";

const getAll = async (user, talentId) => {
  return await getRequest(
    `${getApiUrl()}/${getApiPrefix(user)}/talents/${talentId}/files`,
    {
      headers: {
        Authorization: `Bearer ${getUserToken(user)}`,
      },
    }
  );
};

const upload = async (user, talentId, data) => {
  return await postRequest(
    `${getApiUrl()}/${getApiPrefix(user)}/talents/${talentId}/files`,
    {
      headers: {
        Authorization: `Bearer ${getUserToken(user)}`,
        "Content-Type": "multipart/form-data",
      },
      data,
    }
  );
};

const destroy = async (user, talentId, id) => {
  return await deleteRequest(
    `${getApiUrl()}/${getApiPrefix(user)}/talents/${talentId}/files/${id}`,
    {
      headers: {
        Authorization: `Bearer ${getUserToken(user)}`,
      },
    }
  );
};

export { getAll, upload, destroy };
