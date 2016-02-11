'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nestedFilter;

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Construct a Nested filter: a filter inside a filter.
 *
 * elastic.co/guide/en/elasticsearch/reference/current/query-dsl-nested-filter.html
 *
 * @param  {String} path  Name of the field containing the nested fields.
 * @param  {String} type  Name of the desired nested filter.
 * @param  {String} field Name of the nested field.
 * @param  {Array}  args  Remaining arguments used to construct nested filter.
 * @return {Object}       Nested filter.
 */
function nestedFilter(path, type, field) {
  var klass = _index2.default[type];
  var nestedField = path + '.' + field;
  var filter = undefined;

  if (!klass) {
    throw new Error('Filter type not found.', type);
  }

  for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    args[_key - 3] = arguments[_key];
  }

  filter = klass.apply(undefined, [nestedField].concat(args));

  return {
    nested: {
      path: path,
      filter: filter
    }
  };
}