/**
 * Construct a Geo distance filter.
 *
 * @param  {String} field    Field name to query over.
 * @param  {String} distance Distance.
 * @param  {Object} point    Geo point coordinates (conform with GeoJSON).
 * @return {Object}          Geo distance filter.
 */
export default function geoDistanceFilter(field, distance, point) {
  return {
    geo_distance: {
      distance,
      [field]: point
    }
  }
}
