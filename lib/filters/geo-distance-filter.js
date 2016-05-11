"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = geoDistanceFilter;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Construct a Geo distance filter.
 *
 * @param  {String} field    Field name to query over.
 * @param  {String} distance Distance.
 * @param  {Object} point    Geo point coordinates (conform with GeoJSON).
 * @return {Object}          Geo distance filter.
 */
function geoDistanceFilter(field, distance, point) {
  return {
    geo_distance: _defineProperty({
      distance: distance
    }, field, point)
  };
}