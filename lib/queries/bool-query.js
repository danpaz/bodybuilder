'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = boolQuery;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CONDITIONS_MAP = {
  must: 'must',
  should: 'should',
  must_not: 'must_not',
  mustNot: 'must_not',
  and: 'must',
  or: 'should',
  not: 'must_not'
};

/**
 * Construct a Boolean query.
 *
 * @param  {String} condition Boolean condition: must, must_not, should.
 * @param  {Object} query     Fully-formed query.
 * @return {Object}           Boolean query.
 */
function boolQuery(condition, query) {
  var cond = CONDITIONS_MAP[condition];
  return {
    bool: _defineProperty({}, cond, [query])
  };
}