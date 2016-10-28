
/**
 * Construct a geo shape filter.
 *
 * @memberof Filters
 *
 * @param  {String} field    Field name to query over.
 * @param  {Object} shape    GeoJSON for intersection.
 * @return {Object}          Geo shape filter.
 */
export default function geoShapeFilter(field, shape) {
  return {
    geo_shape: {
      [field]: {
        shape: shape
      }
    }
  }
}
