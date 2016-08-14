import _ from 'lodash'

/**
 * Construct a Match Phrase Prefix query.
 *
 * @param  {String} field Field name to query over.
 * @param  {String} term  Query value.
 * @param  {Object} opts  See match_phrase_prefix
 * @return {Object}       Match match_phrase_prefix.
 */
export default function matchPhrasePrefix(field, term, opts = {}) {
  if (_.isEmpty(opts)) {
    return {
      match_phrase_prefix: {
        [field]: term
      }
    }
  } else {
    opts.query = term;

    return {
      match_phrase_prefix: {
        [field]: opts
      }
    }
  }
}
