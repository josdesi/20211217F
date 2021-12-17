import { E_VALIDATION_FAILED } from "../constants/request";
import { isEmptyObject, isEmptyArray } from "./dataTypes";

/**
 * Gets payload from error exception.
 *
 * @param {*} error
 * @return {{data, message, status}}
 */
const errorParse = (error) => {
  const { response = {} } = error || {};
  const { data = {}, status = null } = response;
  const message = data.message || error.message;

  return { data, message, status };
};

/**
 * Handle the error of response
 *
 * @param {object} errorPayload
 * @return {{message, field}}
 */
const handleResponseError = (errorPayload) => {
  if (isEmptyObject(errorPayload)) return {};
  const { code, message = "", errors = [] } = errorPayload;

  let data = {
    message,
    field: "",
  };

  if (code === E_VALIDATION_FAILED && !isEmptyArray(errors)) {
    const { message, field = "" } = errors[0];
    data = {
      message,
      field,
    };
  }

  return data;
};

export { errorParse, handleResponseError };
