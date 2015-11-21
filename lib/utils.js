'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.mergeConcat = mergeConcat;
exports.boolMerge = boolMerge;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

/**
 * Extends lodash's merge by allowing array concatenation.
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
 * @param  {String} type        Either 'filter' or 'query'.
 * @param  {Object} newObj      New filter or query to add.
 * @param  {Object} currentObj  Old filter or query to merge into.
 * @param  {String} bool        Type of boolean ('and', 'or', 'not').
 * @return {Object}             Combined filter or query.
 */

function boolMerge(type, newObj, currentObj) {
  var bool = arguments.length <= 3 || arguments[3] === undefined ? 'and' : arguments[3];

  var typeClass = type === 'query' ? _queries2['default'] : _filters2['default'];
  var boolCurrent = undefined;
  var boolNew = undefined;

  // Only one, no need for bool.
  //
  if (!currentObj) {
    return newObj;
  }

  // We have a single existing non-bool, need to merge with new.
  //
  boolNew = typeClass.bool(bool, newObj);

  if (!currentObj.bool) {
    boolCurrent = typeClass.bool(bool, currentObj);
    return mergeConcat({}, boolCurrent, boolNew);
  }

  // We have multiple existing, need to merge with new.
  //
  return mergeConcat({}, currentObj, boolNew);
}