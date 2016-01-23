'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.mergeConcat = mergeConcat;
exports.boolMerge = boolMerge;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

/**
 * Extends lodash's merge by allowing array concatenation.
 *
 * @private
 *
 * @param {Object} target Target.
 * @returns {Object} Merged object.
 */

function mergeConcat(target) {
  var args = Array.prototype.slice.call(arguments, 1);

  args.unshift(target);
  args.push(function concatArray(a, b) {
    if (Array.isArray(a)) {
      return a.concat(b);
    }
  });

  return _lodash2['default'].merge.apply(null, args);
}

/**
 * Merge two filters or queries using their Boolean counterparts.
 *
 * @private
 *
 * @param  {Object} newObj      New filter or query to add.
 * @param  {Object} currentObj  Old filter or query to merge into.
 * @param  {String} boolType    Type of boolean ('and', 'or', 'not').
 * @returns {Object} Combined filter or query.
 */

function boolMerge(newObj, currentObj) {
  var boolType = arguments.length <= 2 || arguments[2] === undefined ? 'and' : arguments[2];

  var boolCurrent = undefined;
  var boolNew = undefined;

  // Only one, no need for bool.
  if (_lodash2['default'].isEmpty(currentObj)) {
    // Allow starting with 'or' and 'not' queries.
    if (boolType !== 'and') {
      return _queries2['default'].bool(boolType, newObj);
    }
    return newObj;
  }

  // Make bools out of the new and existing filters.
  boolCurrent = currentObj.bool ? currentObj : _queries2['default'].bool('must', currentObj);
  boolNew = newObj.bool ? newObj : _queries2['default'].bool(boolType, newObj);

  return mergeConcat({}, boolCurrent, boolNew);
}