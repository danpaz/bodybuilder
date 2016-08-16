'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

exports.default = matchPhrasePrefix;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Match Phrase Prefix query.
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @param  {Object} opts  See match_phrase_prefix
 * @return {Object}       Match match_phrase_prefix.
 */
function matchPhrasePrefix(field, term) {
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  if ((0, _isEmpty3.default)(opts)) {
    return {
      match_phrase_prefix: _defineProperty({}, field, term)
    };
  } else {
    opts.query = term;

    return {
      match_phrase_prefix: _defineProperty({}, field, opts)
    };
  }
}