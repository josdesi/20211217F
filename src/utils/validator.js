import { isEmptyString, isObject } from "./dataTypes";
import { requiredRule, numberRule, stringRule, emailRule } from "./formRules";

const getSuccessValidation = (currentData, newData) => {
  return {
    ...currentData,
    value: newData.hasOwnProperty("value") ? newData.value : currentData.value,
    error: "",
    isValid: true,
  };
};

const validator = (currentData, newData = {}) => {
  if (!isObject(currentData)) return currentData;

  const { error } = newData;
  const value = newData.hasOwnProperty("value")
    ? newData.value
    : currentData.value;

  if (currentData.hasOwnProperty("required")) {
    const requiredValidation = requiredRule(currentData.required, value);
    if (requiredValidation) {
      return {
        ...currentData,
        ...requiredValidation,
      };
    }
  }

  if (currentData.hasOwnProperty("numberRule")) {
    const numberValidation = numberRule(currentData.numberRule, value);
    if (numberValidation) {
      return {
        ...currentData,
        ...numberValidation,
      };
    }
  }

  if (currentData.hasOwnProperty("stringRule")) {
    const stringValidation = stringRule(currentData.stringRule, value);
    if (stringValidation) {
      return {
        ...currentData,
        ...stringValidation,
      };
    }
  }

  if (currentData.emailRule) {
    const emailValidation = emailRule(value);
    if (emailValidation) {
      return {
        ...currentData,
        ...emailValidation,
      };
    }
  }

  if (!isEmptyString(error)) {
    return {
      ...currentData,
      isValid: false,
      error,
    };
  }

  return getSuccessValidation(currentData, newData);
};

export default validator;
export { validator };
