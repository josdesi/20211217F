import { isObject, isEmptyArray } from "./dataTypes";

/**
 * Check if form is valid.
 *
 * @param {object} form
 * @return {boolean}
 */
const isValidForm = (form) => {
  if (!isObject(form)) return null;

  for (const [_, data] of Object.entries(form)) {
    if (!data.isValid) return false;
  }
  return true;
};

/**
 * Normalize the form getting keys and values.
 *
 * @param {object} form
 * @return {object}
 */
const toNormalizeForm = (form) => {
  const normizalizedForm = {};
  if (!isObject(form)) return normizalizedForm;

  Object.keys(form).forEach((inputName) => {
    normizalizedForm[inputName] = form[inputName].value;
  });

  return normizalizedForm;
};

/**
 * Simple normalize items for select.
 *
 * @param {object} form
 * @return {array}
 */
const toNormalizeForSelect = (items, keyValue, keyLabel) => {
  if (isEmptyArray(items)) return [];

  return items.map((item) => {
    return { label: item[keyLabel], value: item[keyValue] };
  });
};

/**
 * Normalize locations to use in forms.
 *
 * @param {object} form
 * @return {array}
 */
const toNormalizeLocations = (items) => {
  if (isEmptyArray(items)) return [];

  return items.map(({ id, code, name }) => {
    return { label: `${name} (${code})`, value: id };
  });
};

/**
 * Normalize currencies to use in forms.
 *
 * @param {object} form
 * @return {object}
 */
const toNormalizeCurrency = (items) => {
  if (isEmptyArray(items)) return [];

  return items.map(({ id, symbol }) => {
    return { label: `${symbol}`, value: id };
  });
};

export {
  isValidForm,
  toNormalizeForSelect,
  toNormalizeForm,
  toNormalizeLocations,
  toNormalizeCurrency,
};
