'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = queryStringQuery;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Construct a Query String query.
 *
 * @memberof Queries
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} term  Query value.
 * @param {Object} options See docs for possible options https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html
 * @return {Object}       Query String query.
 */
function queryStringQuery(fields, term) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var query = Array.isArray(fields) ? term : fields;
  fields = Array.isArray(fields) ? fields : [];
  var queryString = {
    query_string: {
      query: query
    }
  };

  if (fields.length > 0) queryString.query_string.fields = fields;
  queryString.query_string = (0, _assign2.default)(queryString.query_string, options);

  return queryString;
}