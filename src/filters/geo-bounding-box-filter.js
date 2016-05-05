/**
 * Construct a geo bounding box filter.
 *
 * @param  {String} field    Field name to query over.
 * @param  {Object} location GeoHash, GeoJSON or Vertices
 * @return {Object}          Geo bounding box filter.
 */
export default function geoBoundingBoxFilter(field, location) {
  return {
    geo_bounding_box: {
      [field]: location
    }
  }
}
