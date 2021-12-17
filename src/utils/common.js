import { isNumber } from "./dataTypes";

/**
 * Currency format.
 *
 * @param {*} value
 * @return {string}
 */
const toFormatCurrency = (number) => {
  if (!isNumber(number)) return "";

  const decimalRegex = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const formats = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
    { value: 1, symbol: "" },
  ];

  const format = formats.slice().find(function (item) {
    return number >= item.value;
  });

  try {
    const newValue = number / format.value;

    return format
      ? newValue.toFixed(2).replace(decimalRegex, "$1") + format.symbol
      : number;
  } catch (error) {
    return "";
  }
};

/**
 * Generate random id.
 *
 * @return {string}
 */
const generateRandomId = () => {
  return `${generateRandomAlphanumeric()}_${generateRandomAlphanumeric()}_${Date.now()}`;
};

/**
 * Generate random alphanumeric.
 *
 * @return {string}
 */
const generateRandomAlphanumeric = (size = 5) => {
  let zeros = size > 1 ? "0".repeat(size - 1) : "";

  return Math.floor((1 + Math.random()) * `0x1${zeros}`).toString(16);
};

export { generateRandomId, toFormatCurrency };
