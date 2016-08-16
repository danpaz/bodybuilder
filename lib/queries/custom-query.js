'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

exports.default = customQuery;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Custom query.
 *
 * @param  {String} customQuery Custom Query name.
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @param  {Object} opts  See match_phrase_prefix
 * @return {Object}       Match match_phrase_prefix.
 */
function customQuery(customQuery, field, term) {
  var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  if ((0, _isEmpty3.default)(opts)) {
    return _defineProperty({}, customQuery, _defineProperty({}, field, term));
  } else {
    opts.query = term;

    return _defineProperty({}, customQuery, _defineProperty({}, field, opts));
  }
}