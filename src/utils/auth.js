import {
  isEmptyString,
  isEmptyObject,
  isEmptyArray,
  isObject,
} from "./dataTypes";
import {
  ROLE_DIRECTOR_CODE,
  ROLE_COACH_CODE,
  ROLE_RECRUITER_CODE,
  ROLE_DIRECTOR_API_PREFIX,
  ROLE_COACH_API_PREFIX,
  ROLE_RECRUITER_API_PREFIX,
  DIRECTOR_COMPONENT_PERMISSIONS,
  COACH_COMPONENT_PERMISSIONS,
  RECRUITER_COMPONENT_PERMISSIONS,
} from "../constants";
/**
 * Check if user is in sessión
 *
 * @param {object} user
 * @return {boolean}
 */
const isUserInSession = (user) => {
  return (
    !isEmptyObject(user) &&
    !isEmptyString(user.jwt?.token) &&
    !isEmptyString(user.role?.code)
  );
};

/**
 * Parse the authenticated user response
 *
 * @param {object} authUser
 * @return {object} Auth user parsed
 */
const parseUserResponse = (authUser) => {
  if (isEmptyObject(authUser)) return {};

  const parsed = { ...authUser };
  if (!isEmptyArray(authUser.user?.roles)) {
    parsed.role = authUser.user?.roles[0];
  }

  return parsed;
};

/**
 * Check if user is director.
 *
 * @param {object} authUser
 * @return {boolean}
 */
const isDirector = (user) => {
  return !isEmptyObject(user) && user.role?.code === ROLE_DIRECTOR_CODE;
};

/**
 * Check if user is coach.
 *
 * @param {object} user
 * @return {boolean}
 */
const isCoach = (user) => {
  return !isEmptyObject(user) && user.role?.code === ROLE_COACH_CODE;
};

/**
 * Check if user is recruiter.
 *
 * @param {object} user
 * @return {boolean}
 */
const isRecruiter = (user) => {
  return !isEmptyObject(user) && user.role?.code === ROLE_RECRUITER_CODE;
};

/**
 * Gets prefix name for api.
 *
 * @param {object} user
 * @return {string}
 */
const getApiPrefix = (user) => {
  if (isDirector(user)) return ROLE_DIRECTOR_API_PREFIX;
  if (isCoach(user)) return ROLE_COACH_API_PREFIX;
  if (isRecruiter(user)) return ROLE_RECRUITER_API_PREFIX;
  return "";
};

/**
 * Gets user token.
 *
 * @param {object} user
 * @return {string}
 */
const getUserToken = (user) => {
  return isObject(user) ? user.jwt?.token || "" : "";
};

/**
 * Gets user token.
 *
 * @param {object} user
 * @return {string}
 */
const getComponentPermissions = (user) => {
  if (isDirector(user)) return DIRECTOR_COMPONENT_PERMISSIONS;
  if (isCoach(user)) return COACH_COMPONENT_PERMISSIONS;
  if (isRecruiter(user)) return RECRUITER_COMPONENT_PERMISSIONS;
  return [];
};

/**
 * Check if user has permission by rule name
 * @param {string} name
 * @return {boolean}
 */
const hasPermission = (user, ruleName) => {
  return isEmptyObject(user) || isEmptyArray(user.componentPermissions)
    ? false
    : user.componentPermissions.includes(ruleName);
};

/**
 * Gets initial state of user.
 *
 * @param {object} userResponse
 * @return {object}
 */
const getUserInitialState = (userData) => {
  return {
    ...userData,
    componentPermissions: getComponentPermissions(userData),
  };
};

export {
  isUserInSession,
  parseUserResponse,
  isDirector,
  isCoach,
  isRecruiter,
  getApiPrefix,
  getUserToken,
  getComponentPermissions,
  hasPermission,
  getUserInitialState,
};
