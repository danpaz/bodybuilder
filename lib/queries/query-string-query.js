"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queryStringQuery;
/**
 * Construct a Query String query.
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} term  Query value.
 * @return {Object}       Query String query.
 */
function queryStringQuery(fields, term) {
  var query = Array.isArray(fields) ? term : fields;
  fields = Array.isArray(fields) ? fields : [];
  var queryString = {
    query_string: {
      query: query
    }
  };

  if (fields.length > 0) queryString.query_string.fields = fields;

  return queryString;
}