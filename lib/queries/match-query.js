'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

exports.default = matchQuery;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Match query.
 *
 * @memberof Queries
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @param  {Object} opts  See https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html for available options
 * @return {Object}       Match query.
 */
function matchQuery(field, term) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if ((0, _isEmpty2.default)(opts)) {
    return {
      match: _defineProperty({}, field, term)
    };
  } else {
    opts.query = term;

    return {
      match: _defineProperty({}, field, opts)
    };
  }
}