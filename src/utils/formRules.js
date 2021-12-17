import { isBoolean, isEmptyObject, isNumber } from "./dataTypes";

export const requiredRule = (required, value) => {
  if (isBoolean(required) && required && !value) {
    return {
      value,
      error: "This field is required",
      isValid: false,
    };
  }

  return null;
};

export const numberRule = (rules, value) => {
  if (isEmptyObject(rules)) return null;
  const { greaterThanZero = false } = rules;

  if (!isNumber(value)) {
    return {
      value,
      error: "Not is a number",
      isValid: false,
    };
  }

  if (greaterThanZero && parseFloat(value) <= 0) {
    return {
      value,
      error: "Must be greater than zero",
      isValid: false,
    };
  }

  return null;
};

export const stringRule = (rules, value) => {
  if (isEmptyObject(rules)) return null;
  const { min = null, max = null } = rules;
  value = String(value);

  if (min !== null && min > 0 && String(value).length < min) {
    return {
      value,
      error: `Must be at least ${min}`,
      isValid: false,
    };
  }

  if (max !== null && max > 0 && String(value).length > max) {
    return {
      value,
      error: `Must be a maximum of ${max}`,
      isValid: false,
    };
  }

  return null;
};

export const emailRule = (value) => {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regexEmail.test(String(value).toLowerCase())) {
    return {
      value,
      error: "Email is invalid",
      isValid: false,
    };
  }

  return null;
};
