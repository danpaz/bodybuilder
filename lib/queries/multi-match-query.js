'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = multiMatchQuery;
/**
 * Construct a Multi Match query.
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} query   The query string.
 * @param  {String} type    The type of multi_match query (optional).
 * @return {Object}         Multi Match query.
 */
function multiMatchQuery(fields, query) {
  var type = arguments.length <= 2 || arguments[2] === undefined ? 'best_fields' : arguments[2];

  return {
    multi_match: {
      query: query,
      type: type,
      fields: fields
    }
  };
}