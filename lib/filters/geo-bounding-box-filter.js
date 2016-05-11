"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = geoBoundingBoxFilter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a geo bounding box filter.
 *
 * @param  {String} field    Field name to query over.
 * @param  {Object} location GeoHash, GeoJSON or Vertices
 * @return {Object}          Geo bounding box filter.
 */
function geoBoundingBoxFilter(field, location) {
  return {
    geo_bounding_box: _defineProperty({}, field, location)
  };
}