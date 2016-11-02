'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = multiMatchQuery;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  type: 'best_fields'
};

/**
 * Construct a Multi Match query. Default type is 'best_fields'.
 *
 * @memberof Queries
 *
 * @param  {Array}  fields  The field names to query over.
 * @param  {String} query   The query string.
 * @param  {Object} options See docs for possible options https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html
 * @return {Object}         Multi Match query.
 */
function multiMatchQuery(fields, query) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions;

  if (typeof options === 'string') {
    options = {
      type: options
    };
  }
  options.type = options.type || defaultOptions.type;

  return {
    multi_match: (0, _assign2.default)({
      query: query,
      fields: fields
    }, options)
  };
}