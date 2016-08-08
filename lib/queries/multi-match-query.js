'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = multiMatchQuery;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Construct a Multi Match query.
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} query   The query string.
 * @param  {String} [type='best_fields']  The type of multi_match query.
 * @param {Object} options see docs for possible options https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
 * @return {Object}         Multi Match query.
 */
function multiMatchQuery(fields, query) {
  var type = arguments.length <= 2 || arguments[2] === undefined ? 'best_fields' : arguments[2];
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  return {
    multi_match: (0, _assign2.default)({
      query: query,
      type: type,
      fields: fields
    }, options)
  };
}