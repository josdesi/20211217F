import { isEmptyArray, isEmptyString } from "./dataTypes";

/**
 * Gets query parsed of searcher
 *
 * @param {*} error
 * @return {object}
 */
const getSearcherQuery = (searcher) => {
  const query = {};

  query.byIndustryId = isEmptyArray(searcher.industries)
    ? null
    : searcher.industries;

  query.byLocationId = isEmptyArray(searcher.locations)
    ? null
    : searcher.locations;

  query.byName = isEmptyString(searcher.quickSearch)
    ? null
    : searcher.quickSearch;

  return query;
};

export { getSearcherQuery };
