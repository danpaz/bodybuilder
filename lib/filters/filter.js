"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
  }, {
    key: "andify",
    value: function andify() {
      return {
        and: [this]
      };
    }
  }, {
    key: "orify",
    value: function orify() {
      return {
        or: [this]
      };
    }
  }, {
    key: "notify",
    value: function notify() {
      return {
        not: this
      };
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
module.exports = exports["default"];