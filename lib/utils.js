'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extend = require('lodash\\extend');

var _extend2 = _interopRequireDefault(_extend);

var _findIndex = require('lodash\\findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

var _isEmpty = require('lodash\\isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isArray = require('lodash\\isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _assignWith = require('lodash\\assignWith');

var _assignWith2 = _interopRequireDefault(_assignWith);

var _isPlainObject = require('lodash\\isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

exports.mergeConcat = mergeConcat;
exports.boolMerge = boolMerge;
exports.sortMerge = sortMerge;

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Extends lodash's assignWith by allowing array concatenation
 * and deep merging.
 *
 * @private
 *
 * @param {Object} target Target.
 * @returns {Object} Merged object.
 */
function mergeConcat(target) {
  var args = Array.prototype.slice.call(arguments, 1);

  args.unshift(target);
  args.push(function customizer(a, b) {
    if ((0, _isPlainObject2.default)(a)) {
      return (0, _assignWith2.default)(a, b, customizer);
    } else if ((0, _isArray2.default)(a)) {
      return a.concat(b);
    } else {
      return b;
    }
  });
  return _assignWith2.default.apply(null, args);
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

  var boolCurrent = void 0;
  var boolNew = void 0;

  // Only one, no need for bool.
  if ((0, _isEmpty2.default)(currentObj)) {
    // Allow starting with 'or' and 'not' queries.
    if (boolType !== 'and') {
      return _queries2.default.bool(boolType, newObj);
    }
    return newObj;
  }

  // Make bools out of the new and existing filters.
  boolCurrent = currentObj.bool ? currentObj : _queries2.default.bool('must', currentObj);
  boolNew = newObj.bool ? newObj : _queries2.default.bool(boolType, newObj);

  return mergeConcat({}, boolCurrent, boolNew);
}

/**
 * Compound sort function into the list of sorts
 *
 * @private
 *
 * @param  {Array} current      Array of elasticsearch sorts
 * @param  {String} field             Field name.
 * @param  {String} [direction='asc'] A valid direction: 'asc' or 'desc'.
 * @returns {Array} Array of elasticsearch sorts.
 */
function sortMerge(current, field, direction) {
  var payload = _defineProperty({}, field, { order: direction.order || direction });

  var idx = (0, _findIndex2.default)(current, function (o) {
    return o[field] != undefined;
  });

  if (idx == -1) {
    current.push(payload);
  } else {
    (0, _extend2.default)(current[idx], payload);
  }

  return current;
}