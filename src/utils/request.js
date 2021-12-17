/* eslint-disable no-undef */
import {
  DRAFT_POST_TYPE,
  PUBLISHED_POST_TYPE,
  API_MAX_FILE_SIZE_IN_BYTE,
} from "../constants/request";
import { isNumber } from "./dataTypes";

/**
 * Check if type is draft.
 *
 * @return {string}
 */
const isDraft = (type) => {
  return type === DRAFT_POST_TYPE;
};

/**
 * Check if type is published.
 *
 * @return {string}
 */
const isPublished = (type) => {
  return type === PUBLISHED_POST_TYPE;
};

/**
 * Check if the file size exceeds what is allowed
 *
 * @return {string}
 */
const isMaxFileSize = (bytes) => {
  return isNumber(bytes) ? bytes > API_MAX_FILE_SIZE_IN_BYTE : false;
};

/**
 * Gets url of API
 *
 * @return {string}
 */
const getApiUrl = () => {
  return process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_URL_DEV;
};

export { isDraft, isPublished, isMaxFileSize, getApiUrl };
