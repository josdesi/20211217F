/**
 * Check if value is object.
 *
 * @param {*} value
 * @return {boolean}
 */
const isObject = (value) => {
  return value && typeof value === "object";
};

/**
 * Check if value is empty object.
 *
 * @param {*} value
 * @return {boolean}
 */
const isEmptyObject = (value) => {
  return !isObject(value) || Object.keys(value).length === 0;
};

/**
 * Parse object from string.
 *
 * @param {string} value
 * @param {object} defaultValue
 * @return {object}
 */
const toObjectParse = (value, defaultValue = {}) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return defaultValue;
  }
};

/**
 * Check if array is empty object.
 *
 * @param {*} value
 * @return {boolean}
 */
const isEmptyArray = (value) => {
  return !Array.isArray(value) || value.length === 0;
};

/**
 * Check if value is string.
 *
 * @param {*} value
 * @return {boolean}
 */
const isString = (string) => {
  return typeof string !== "string";
};

/**
 * Check if value is empty string.
 *
 * @param {*} value
 * @return {boolean}
 */
const isEmptyString = (string) => {
  return !string || isString(string) || string.length === 0;
};

/**
 * Check if value is function.
 *
 * @param {*} value
 * @return {boolean}
 */
const isFunction = (value) => {
  return value && typeof value === "function";
};

/**
 * Check if value is number.
 *
 * @param {*} value
 * @return {boolean}
 */
const isNumber = (value) => {
  return !isNaN(value) || typeof value == "number";
};

/**
 * Check if value is boolean.
 *
 * @param {*} value
 * @return {boolean}
 */
const isBoolean = (value) => {
  return typeof value === "boolean";
};

/**
 * Clone object.
 *
 * @param {object|array} data
 * @return {boolean}
 */
const toCloneData = (data) => {
  return isObject(data) || Array.isArray(data)
    ? JSON.parse(JSON.stringify(data))
    : null;
};

export {
  isObject,
  isEmptyObject,
  isEmptyString,
  isString,
  toObjectParse,
  isEmptyArray,
  isFunction,
  isNumber,
  isBoolean,
  toCloneData,
};
