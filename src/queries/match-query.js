import _ from 'lodash'

/**
 * Construct a Match query.
 *
 * @memberof Queries
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @param  {Object} opts  See https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html for available options
 * @return {Object}       Match query.
 */
export default function matchQuery(field, term, opts = {}) {
  if (_.isEmpty(opts)) {
    return {
      match: {
        [field]: term
      }
    }
  } else {
    opts.query = term

    return {
      match: {
        [field]: opts
      }
    }
  }
}
