import _ from 'lodash'

/**
 * Construct a Custom query.
 *
 * @param  {String} customQuery Custom Query name.
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @param  {Object} opts  See match_phrase_prefix
 * @return {Object}       Match match_phrase_prefix.
 */
export default function customQuery(customQuery, field, term, opts = {}) {
  if (_.isEmpty(opts)) {
    return {
      [customQuery]: {
        [field]: term
      }
    }
  } else {
    opts.query = term;

    return {
      [customQuery]: {
        [field]: opts
      }
    }
  }
}
