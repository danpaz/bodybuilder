"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Filter = (function () {
  function Filter() {
    _classCallCheck(this, Filter);

    Filter.filtersMade++;
  }

  _createClass(Filter, [{
    key: "toString",
    value: function toString() {
      return JSON.stringify(this);
    }
  }], [{
    key: "filtersMade",
    get: function get() {
      return !this._count ? 0 : this._count;
    },
    set: function set(val) {
      this._count = val;
    }
  }]);

  return Filter;
})();

exports["default"] = Filter;

var RangeFilter = (function (_Filter) {
  _inherits(RangeFilter, _Filter);

  // ranges = {gte, lte}
  // opts = {time_zone}

  function RangeFilter(field, ranges) {
    _classCallCheck(this, RangeFilter);

    _get(Object.getPrototypeOf(RangeFilter.prototype), "constructor", this).call(this);
    this.range = {};
    this.range[field] = ranges;
  }

  return RangeFilter;
})(Filter);

exports.RangeFilter = RangeFilter;

var TermFilter = (function (_Filter2) {
  _inherits(TermFilter, _Filter2);

  // gte, lte, time_zone

  function TermFilter(field, term, opts) {
    _classCallCheck(this, TermFilter);

    _get(Object.getPrototypeOf(TermFilter.prototype), "constructor", this).call(this);
    this.term = {};
    this.term[field] = opts;
  }

  return TermFilter;
})(Filter);

exports.TermFilter = TermFilter;